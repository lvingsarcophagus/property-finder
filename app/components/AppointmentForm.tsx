"use client";

import { useState, FormEvent } from 'react';
import { createBrowserClient } from '@/lib/supabase-client'; // Adjusted to use the function from the file

export default function AppointmentForm() {
  const supabase = createBrowserClient(); // Initialize Supabase client

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [preferredDateTime, setPreferredDateTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error' | 'warning', text: string } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setFormMessage(null);

    // Basic validation
    if (!clientName || !clientEmail || !serviceName || !preferredDateTime) {
      setFormMessage({ type: 'error', text: 'Please fill all required fields: Name, Email, Service, and Preferred Date/Time.' });
      setIsLoading(false);
      return;
    }

    try {
      // 1. Insert into Supabase 'appointments' table
      const { data: appointmentData, error: appointmentError } = await supabase
        .from('appointments')
        .insert([{
          client_name: clientName,
          client_email: clientEmail,
          client_phone: clientPhone || null,
          service_name: serviceName,
          preferred_datetime: preferredDateTime,
          notes: notes || null,
          status: 'pending_confirmation',
          // coach_id: null, // Assuming not applicable or handled by backend/trigger
        }])
        .select()
        .single();

      if (appointmentError) throw appointmentError;
      if (!appointmentData) throw new Error("Failed to create appointment, no data returned from Supabase.");

      const newAppointmentId = appointmentData.id;
      setFormMessage({ type: 'success', text: 'Appointment data saved. Attempting to create calendar event...' });


      // 2. Call Supabase Edge Function
      const { data: functionData, error: functionError } = await supabase.functions.invoke(
        'create-google-calendar-event',
        {
          body: {
            appointmentId: newAppointmentId,
            clientName,
            clientEmail,
            clientPhone: clientPhone || null,
            serviceName,
            preferred_datetime: preferredDateTime,
            notes: notes || null,
          }
        }
      );

      if (functionError) {
        console.error("Edge function error:", functionError);
        // Update appointment status to reflect sync issue, or just inform user
        await supabase.from('appointments').update({ status: 'pending_calendar_sync' }).eq('id', newAppointmentId);
        setFormMessage({ type: 'warning', text: `Appointment booked (ID: ${newAppointmentId}), but calendar sync failed: ${functionError.message}. We will confirm shortly.` });
      } else {
        setFormMessage({ type: 'success', text: `Appointment successfully booked (ID: ${newAppointmentId}) and calendar event created! Event ID: ${functionData?.googleEventId || 'N/A'}` });
        // Reset form
        setClientName('');
        setClientEmail('');
        setClientPhone('');
        setServiceName('');
        setPreferredDateTime('');
        setNotes('');
      }

    } catch (error: any) {
      console.error("Booking error:", error);
      setFormMessage({ type: 'error', text: error.message || "Could not book appointment. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formMessage && (
        <div className={`p-4 rounded-md ${formMessage.type === 'error' ? 'bg-red-100 text-red-700' : formMessage.type === 'warning' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
          {formMessage.text}
        </div>
      )}

      <div>
        <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client Name*</label>
        <input id="clientName" type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} required
               className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-calryon-teal focus:border-calryon-teal bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/>
      </div>

      <div>
        <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client Email*</label>
        <input id="clientEmail" type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} required
               className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-calryon-teal focus:border-calryon-teal bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/>
      </div>

      <div>
        <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client Phone</label>
        <input id="clientPhone" type="tel" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)}
               className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-calryon-teal focus:border-calryon-teal bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/>
      </div>

      <div>
        <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service*</label>
        <select id="serviceName" value={serviceName} onChange={(e) => setServiceName(e.target.value)} required
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-calryon-teal focus:border-calryon-teal bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
          <option value="" disabled>Select a service</option>
          <option value="Legal Services">Legal Services</option>
          <option value="HR Services">HR Services</option>
          <option value="Education Consulting">Education Consulting</option>
          <option value="Business Consulting">Business Consulting</option>
        </select>
      </div>

      <div>
        <label htmlFor="preferredDateTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Date & Time*</label>
        <input id="preferredDateTime" type="datetime-local" value={preferredDateTime} onChange={(e) => setPreferredDateTime(e.target.value)} required
               className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-calryon-teal focus:border-calryon-teal bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
        <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={4}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-calryon-teal focus:border-calryon-teal bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/>
      </div>

      <button type="submit" disabled={isLoading}
              className="w-full bg-calryon-teal text-white px-6 py-3 rounded-md shadow-sm hover:bg-calryon-teal/90 dark:hover:bg-calryon-teal/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-calryon-teal disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed">
        {isLoading ? 'Booking...' : 'Book Appointment'}
      </button>
    </form>
  );
}
