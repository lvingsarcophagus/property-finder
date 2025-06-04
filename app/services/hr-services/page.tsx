import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, TrendingUp, ClipboardList } from 'lucide-react';

export default function HRServicesPage() {
  return (
    <>
      <Header />
      <main className="bg-white dark:bg-calryon-gray-dark">
        {/* Hero Section for HR Services */}
        <section className="bg-calryon-teal text-white py-16 md:py-20">
          <div className="container mx-auto px-6 text-center">
            <Users className="mx-auto h-16 w-16 mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">HR Services</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Optimizing your workforce potential and streamlining HR processes for business success.
            </p>
          </div>
        </section>

        {/* Detailed Description */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="prose prose-lg dark:prose-invert max-w-3xl mx-auto text-calryon-gray-dark dark:text-calryon-gray-light mb-12">
              <h2 className="text-3xl font-semibold text-calryon-teal dark:text-teal-400 mb-4">
                Strategic Human Resource Management
              </h2>
              <p>
                Calryon Group's HR Services division offers comprehensive solutions to manage your most valuable asset: your people. We partner with businesses of all sizes to develop and implement HR strategies that align with your organizational goals, foster a positive work environment, and ensure compliance with employment regulations.
              </p>
              <p>
                Our expertise covers the full spectrum of HR functions, including talent acquisition and retention, performance management, employee relations, compensation and benefits, and HR policy development. We aim to transform your HR operations from a purely administrative function into a strategic driver of business growth and employee engagement.
              </p>
              <p>
                Whether you need to overhaul your entire HR department, implement a new performance review system, or simply require expert advice on a specific employment issue, our team of seasoned HR professionals is here to provide practical, effective, and tailored support.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12 text-calryon-gray-dark dark:text-calryon-gray-light">
              <div className="bg-calryon-gray-light dark:bg-gray-900 p-6 rounded-lg shadow">
                <Briefcase className="h-8 w-8 text-calryon-teal mb-3" />
                <h3 className="text-xl font-semibold text-calryon-teal dark:text-teal-400 mb-2">Talent Acquisition</h3>
                <p>Strategic sourcing, recruitment, and onboarding processes to attract and retain top talent.</p>
              </div>
              <div className="bg-calryon-gray-light dark:bg-gray-900 p-6 rounded-lg shadow">
                <TrendingUp className="h-8 w-8 text-calryon-teal mb-3" />
                <h3 className="text-xl font-semibold text-calryon-teal dark:text-teal-400 mb-2">Performance Management</h3>
                <p>Developing systems that align employee performance with organizational objectives and foster growth.</p>
              </div>
              <div className="bg-calryon-gray-light dark:bg-gray-900 p-6 rounded-lg shadow">
                <ClipboardList className="h-8 w-8 text-calryon-teal mb-3" />
                <h3 className="text-xl font-semibold text-calryon-teal dark:text-teal-400 mb-2">Policy & Compliance</h3>
                <p>Ensuring your HR policies are compliant, effective, and support a fair workplace.</p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <Button size="lg" asChild className="bg-calryon-teal text-white hover:bg-calryon-teal/90 dark:hover:bg-calryon-teal/80 px-10 py-3 text-lg">
                <Link href="/book-appointment?service=HR Services">Optimize Your HR Strategy</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
