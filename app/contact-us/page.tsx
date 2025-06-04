import Header from '@/app/components/Header'; // Adjust as needed
import Footer from '@/app/components/Footer'; // Adjust as needed
import ContactForm from '@/app/components/ContactForm'; // Adjust as needed
import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react'; // Adding MapPin for Address

export default function ContactUsPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center text-calryon-gray-dark dark:text-calryon-gray-light">Get in Touch</h1>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Contact Form Section */}
          <div className="bg-white dark:bg-calryon-gray-dark p-8 rounded-xl shadow-2xl">
            <h2 className="text-3xl font-semibold mb-6 text-calryon-gray-dark dark:text-calryon-gray-light border-b pb-4 border-gray-200 dark:border-gray-700">Send us a Message</h2>
            <ContactForm />
          </div>

          {/* Contact Details Section */}
          <div className="bg-white dark:bg-calryon-gray-dark p-8 rounded-xl shadow-2xl">
            <h2 className="text-3xl font-semibold mb-6 text-calryon-gray-dark dark:text-calryon-gray-light border-b pb-4 border-gray-200 dark:border-gray-700">Our Contact Details</h2>
            <div className="space-y-6">

              <div className="flex items-start space-x-3">
                <MapPin className="w-6 h-6 text-calryon-teal mt-1" />
                <div>
                  <h3 className="font-semibold text-xl text-calryon-teal dark:text-teal-400">Address:</h3>
                  <p className="text-gray-600 dark:text-gray-300">Calryon Group HQ, 123 Innovation Drive, Vilnius, Lithuania</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-6 h-6 text-calryon-teal mt-1" />
                <div>
                  <h3 className="font-semibold text-xl text-calryon-teal dark:text-teal-400">Email:</h3>
                  <a href="mailto:info@calryongroup.com" className="text-gray-600 dark:text-gray-300 hover:text-calryon-teal/80 dark:hover:text-teal-300 transition-colors">info@calryongroup.com</a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-6 h-6 text-calryon-teal mt-1" />
                <div>
                  <h3 className="font-semibold text-xl text-calryon-teal dark:text-teal-400">Phone:</h3>
                  <a href="tel:+37012345678" className="text-gray-600 dark:text-gray-300 hover:text-calryon-teal/80 dark:hover:text-teal-300 transition-colors">+370 123 45678</a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MessageCircle className="w-6 h-6 text-calryon-teal mt-1" /> {/* Using MessageCircle for WhatsApp */}
                <div>
                  <h3 className="font-semibold text-xl text-calryon-teal dark:text-teal-400">WhatsApp:</h3>
                  <a href="https://wa.me/37012345678" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-calryon-teal/80 dark:hover:text-teal-300 transition-colors">Chat with us on WhatsApp</a>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-xl text-calryon-teal dark:text-teal-400 mb-3">Find Us Here:</h3>
                <div className="w-full h-72 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 shadow-inner">
                  Map Placeholder - Integration TBD
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
