import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { google } from 'https://esm.sh/googleapis@105.0.0' // Or a direct fetch if preferred

// WARNING: Ensure these environment variables are set in your Supabase project's Edge Function settings
const SUPABASE_URL = Deno.env.get('REACT_APP_SUPABASE_URL')!
const SUPABASE_ANON_KEY = Deno.env.get('REACT_APP_SUPABASE_ANON_KEY')!
const GOOGLE_CLIENT_ID = Deno.env.get('GOOGLE_CLIENT_ID')!
const GOOGLE_CLIENT_SECRET = Deno.env.get('GOOGLE_CLIENT_SECRET')!
const GOOGLE_REFRESH_TOKEN = Deno.env.get('GOOGLE_REFRESH_TOKEN')! // User must provide this
const GOOGLE_CALENDAR_ID = Deno.env.get('GOOGLE_CALENDAR_ID')! // shubam@claryongroup.com

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const { appointmentId, clientName, clientEmail, clientPhone, serviceName, preferred_datetime, notes } = await req.json()

    if (!appointmentId || !clientName || !clientEmail || !preferred_datetime || !serviceName) {
      return new Response(JSON.stringify({ error: 'Missing required appointment details' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (!GOOGLE_REFRESH_TOKEN) {
     console.error('GOOGLE_REFRESH_TOKEN is not set. User needs to configure this in Edge Function environment variables.');
     // Optionally, update the appointment status to indicate a pending sync
     return new Response(JSON.stringify({ error: 'Google Refresh Token not configured. Cannot create calendar event.' }), {
       status: 500,
       headers: { 'Content-Type': 'application/json' },
     });
   }

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { // Consider using the service role key for admin tasks if appropriate and available
     auth: {
       persistSession: false
     }
    });

    // 1. Obtain Google OAuth2 Access Token
    const oauth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      // No redirect URI needed for server-to-server refresh token flow
    );
    oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

    const { token: accessToken } = await oauth2Client.getAccessToken();
    if (!accessToken) {
      console.error('Failed to obtain Google Access Token');
      return new Response(JSON.stringify({ error: 'Failed to obtain Google Access Token' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    oauth2Client.setCredentials({ access_token: accessToken });


    // 2. Create Google Calendar Event
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const eventStartTime = new Date(preferred_datetime);
    // Ensure the date is valid
     if (isNaN(eventStartTime.getTime())) {
         return new Response(JSON.stringify({ error: 'Invalid preferred_datetime format' }), {
             status: 400,
             headers: { 'Content-Type': 'application/json' },
         });
     }
    const eventEndTime = new Date(eventStartTime.getTime() + 60 * 60 * 1000); // Assume 1 hour duration

    const event = {
      summary: `Appointment: ${serviceName} with ${clientName}`,
      description: `Client Name: ${clientName}
Client Email: ${clientEmail}
Client Phone: ${clientPhone || 'Not provided'}
Service: ${serviceName}
Notes: ${notes || 'None'}`,
      start: {
        dateTime: eventStartTime.toISOString(),
        timeZone: 'Europe/Vilnius', // As specified
      },
      end: {
        dateTime: eventEndTime.toISOString(),
        timeZone: 'Europe/Vilnius',
      },
      attendees: [
        { email: clientEmail },
        { email: GOOGLE_CALENDAR_ID }, // Add the consultant as an attendee
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 60 }, // 1 hour before
        ],
      },
    };

    let createdEvent;
    try {
       createdEvent = await calendar.events.insert({
         calendarId: GOOGLE_CALENDAR_ID,
         requestBody: event,
       });
    } catch (e) {
       console.error('Google Calendar API error:', e);
       // Try to parse more specific error from Google
       let googleError = 'Failed to create Google Calendar event.';
       if (e.errors && e.errors.length > 0) {
         googleError = e.errors.map(err => err.message).join('; ');
       } else if (e.message) {
         googleError = e.message;
       }
       return new Response(JSON.stringify({ error: `Google Calendar API Error: ${googleError}` }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
       });
    }


    if (!createdEvent || !createdEvent.data || !createdEvent.data.id) {
      console.error('Failed to create Google Calendar event or event ID missing.');
      return new Response(JSON.stringify({ error: 'Failed to create Google Calendar event or event ID missing.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const googleEventId = createdEvent.data.id;

    // 3. Update Supabase appointment record with Google Calendar Event ID
    const { error: updateError } = await supabaseAdmin
      .from('appointments')
      .update({ google_calendar_event_id: googleEventId, status: 'confirmed' }) // Assuming 'confirmed' is a valid status
      .eq('id', appointmentId);

    if (updateError) {
      console.error('Supabase update error:', updateError);
      // Note: Calendar event was created. May need manual reconciliation or a retry mechanism for this update.
      return new Response(JSON.stringify({ error: `Failed to update appointment with Google Event ID: ${updateError.message}` }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, googleEventId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('General error in Edge Function:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
})
