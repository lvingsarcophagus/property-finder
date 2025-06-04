import Header from '@/app/components/Header'; // Adjust path as needed
import Footer from '@/app/components/Footer'; // Adjust path as needed
import AppointmentForm from '@/app/components/AppointmentForm';

export default function BookAppointmentPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-calryon-gray-dark dark:text-calryon-gray-light">Book an Appointment</h1>
        <div className="max-w-2xl mx-auto bg-white dark:bg-calryon-gray-dark p-8 rounded-lg shadow-md">
          <AppointmentForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
