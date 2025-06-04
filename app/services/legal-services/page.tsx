import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Scale, Briefcase, Users, Shield } from 'lucide-react'; // Removed Landmark

export default function LegalServicesPage() {
  const subServices = [
    { name: "Immigration Law", description: "Expert guidance on visas, residency, citizenship, and all immigration-related matters. We assist individuals, families, and businesses in navigating complex immigration systems.", icon: Users },
    { name: "Criminal Law", description: "Dedicated defense and representation in a wide range of criminal cases. Protecting your rights at every stage of the legal process.", icon: Shield },
    { name: "Business Law", description: "Comprehensive legal solutions for businesses, including formation, contracts, compliance, and dispute resolution. Supporting your enterprise's growth and stability.", icon: Briefcase },
  ];

  return (
    <>
      <Header />
      <main className="bg-white dark:bg-calryon-gray-dark">
        {/* Hero Section for Legal Services */}
        <section className="bg-calryon-teal text-white py-16 md:py-20">
          <div className="container mx-auto px-6 text-center">
            <Scale className="mx-auto h-16 w-16 mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Legal Services</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Navigating the complexities of the legal landscape with expert advice and steadfast representation.
            </p>
          </div>
        </section>

        {/* Detailed Description */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="prose prose-lg dark:prose-invert max-w-3xl mx-auto text-calryon-gray-dark dark:text-calryon-gray-light mb-12">
              <h2 className="text-3xl font-semibold text-calryon-teal dark:text-teal-400 mb-4">
                Comprehensive Legal Expertise
              </h2>
              <p>
                At Calryon Group, our Legal Services division is dedicated to providing individuals and businesses with top-tier legal counsel and representation. We understand that legal challenges can be daunting, which is why we prioritize clear communication, strategic thinking, and a client-focused approach. Our team of experienced legal professionals is committed to upholding the highest standards of practice and achieving the best possible outcomes for our clients.
              </p>
              <p>
                Whether you are facing a personal legal issue, navigating the regulatory environment for your business, or seeking advice on international law, we offer tailored solutions to meet your specific needs. We believe in proactive legal support to mitigate risks and empower informed decision-making.
              </p>
            </div>

            {/* Sub-Services Section */}
            <div className="mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-calryon-gray-dark dark:text-white">
                Our Areas of Expertise
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                {subServices.map((service) => {
                  const Icon = service.icon;
                  return (
                    <div key={service.name} className="bg-calryon-gray-light dark:bg-gray-900 p-6 rounded-lg shadow-lg text-center">
                      <Icon className="mx-auto h-10 w-10 text-calryon-teal mb-4" />
                      <h4 className="text-xl font-semibold mb-2 text-calryon-teal dark:text-teal-400">{service.name}</h4>
                      <p className="text-sm text-gray-700 dark:text-calryon-gray-light">{service.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <Button size="lg" asChild className="bg-calryon-teal text-white hover:bg-calryon-teal/90 dark:hover:bg-calryon-teal/80 px-10 py-3 text-lg">
                <Link href="/book-appointment?service=Legal Services">Book a Legal Consultation</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
