"use client";

import { useState, FormEvent } from 'react';
import { createBrowserClient } from '@/lib/supabase-client'; // Adjusted path

export default function ContactForm() {
  const supabase = createBrowserClient(); // Initialize Supabase client

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceOfInterest, setServiceOfInterest] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setFormMessage(null);

    // Basic validation
    if (!name || !email || !message) {
      setFormMessage({ type: 'error', text: 'Please fill all required fields: Name, Email, and Message.' });
      setIsLoading(false);
      return;
    }
    if (message.length < 10) {
      setFormMessage({ type: 'error', text: 'Message must be at least 10 characters long.' });
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name,
          email,
          phone: phone || null,
          service_of_interest: serviceOfInterest || null,
          message,
          is_read: false,
          // submitted_at will be set by default by Supabase (timestamptz default now())
        }]);

      if (error) throw error;

      setFormMessage({ type: 'success', text: "Thank you for your message! We'll be in touch soon." });
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setServiceOfInterest('');
      setMessage('');

    } catch (error: any) {
      console.error("Contact form error:", error);
      setFormMessage({ type: 'error', text: error.message || "Could not send message. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formMessage && (
        <div className={`p-4 rounded-md text-sm ${formMessage.type === 'error' ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200' : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'}`}>
          {formMessage.text}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name*</label>
        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required
               className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-calryon-teal focus:border-calryon-teal bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address*</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
               className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-calryon-teal focus:border-calryon-teal bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number (Optional)</label>
        <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
               className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-calryon-teal focus:border-calryon-teal bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/>
      </div>

      <div>
        <label htmlFor="serviceOfInterest" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service of Interest (Optional)</label>
        <select id="serviceOfInterest" value={serviceOfInterest} onChange={(e) => setServiceOfInterest(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-calryon-teal focus:border-calryon-teal bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
          <option value="">Select a service (Optional)</option>
          <option value="Legal Services">Legal Services</option>
          <option value="HR Services">HR Services</option>
          <option value="Education Consulting">Education Consulting</option>
          <option value="Business Consulting">Business Consulting</option>
          <option value="Other/General Inquiry">Other/General Inquiry</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message* (min. 10 characters)</label>
        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required minLength={10} rows={5}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-calryon-teal focus:border-calryon-teal bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/>
      </div>

      <button type="submit" disabled={isLoading}
              className="w-full bg-calryon-teal text-white px-6 py-3 rounded-md shadow-sm hover:bg-calryon-teal/90 dark:hover:bg-calryon-teal/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-calryon-teal disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors duration-150">
        {isLoading ? 'Sending Message...' : 'Send Message'}
      </button>
    </form>
  );
}
