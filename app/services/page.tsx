import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

export default function ServicesOverviewPage() {
  const services = [
    { name: "Legal Services", href: "/services/legal-services", description: "Comprehensive legal advice and representation." },
    { name: "HR Services", href: "/services/hr-services", description: "Human resources management and consulting." },
    { name: "Education Consulting", href: "/services/education-consulting", description: "Guidance for educational institutions and students." },
    { name: "Business Consulting", href: "/services/business-consulting", description: "Strategic advice to help your business grow." },
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6 text-calryon-gray-dark dark:text-calryon-gray-light">
            Our Services
          </h1>
          <p className="text-xl mb-12 text-calryon-gray-dark dark:text-calryon-gray-light max-w-2xl mx-auto">
            Calryon Group offers a diverse range of professional consulting services designed to meet your unique needs. Explore our offerings below.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Link key={service.name} href={service.href} className="block p-6 bg-white dark:bg-calryon-gray-dark rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-calryon-teal dark:text-teal-400 mb-3">{service.name}</h2>
              <p className="text-calryon-gray-dark dark:text-calryon-gray-light">{service.description}</p>
              <span className="mt-4 inline-block text-calryon-teal dark:text-teal-300 hover:underline">Learn more &rarr;</span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
