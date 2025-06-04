import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Briefcase, TrendingUp, Lightbulb, DollarSign } from 'lucide-react';

export default function BusinessConsultingPage() {
  return (
    <>
      <Header />
      <main className="bg-white dark:bg-calryon-gray-dark">
        {/* Hero Section for Business Consulting */}
        <section className="bg-calryon-teal text-white py-16 md:py-20">
          <div className="container mx-auto px-6 text-center">
            <Briefcase className="mx-auto h-16 w-16 mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Business Consulting</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Driving growth and efficiency in your business with strategic insights and tailored solutions.
            </p>
          </div>
        </section>

        {/* Detailed Description */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="prose prose-lg dark:prose-invert max-w-3xl mx-auto text-calryon-gray-dark dark:text-calryon-gray-light mb-12">
              <h2 className="text-3xl font-semibold text-calryon-teal dark:text-teal-400 mb-4">
                Strategic Business Advisory
              </h2>
              <p>
                Calryon Group's Business Consulting division empowers enterprises to achieve sustainable growth, navigate market complexities, and optimize operational performance. We partner with businesses across various industries, from startups to established corporations, providing strategic advice and actionable solutions that deliver tangible results.
              </p>
              <p>
                Our experienced consultants offer expertise in market analysis, business model innovation, operational efficiency, financial strategy, and digital transformation. We take a holistic approach, understanding your unique challenges and opportunities to develop customized strategies that align with your long-term vision.
              </p>
              <p>
                Whether you are looking to enter new markets, improve profitability, streamline processes, or leverage technology for competitive advantage, Calryon Group is your trusted advisor for building a resilient and thriving business.
              </p>
            </div>

            {/* Example Sub-sections or Key Offerings */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 text-calryon-gray-dark dark:text-calryon-gray-light">
              <div className="bg-calryon-gray-light dark:bg-gray-900 p-6 rounded-lg shadow">
                <TrendingUp className="h-8 w-8 text-calryon-teal mb-3" />
                <h3 className="text-xl font-semibold text-calryon-teal dark:text-teal-400 mb-2">Market Strategy</h3>
                <p>Comprehensive market analysis, entry strategies, and competitive positioning.</p>
              </div>
              <div className="bg-calryon-gray-light dark:bg-gray-900 p-6 rounded-lg shadow">
                <Lightbulb className="h-8 w-8 text-calryon-teal mb-3" />
                <h3 className="text-xl font-semibold text-calryon-teal dark:text-teal-400 mb-2">Operational Excellence</h3>
                <p>Process optimization, efficiency improvements, and supply chain management.</p>
              </div>
              <div className="bg-calryon-gray-light dark:bg-gray-900 p-6 rounded-lg shadow">
                <DollarSign className="h-8 w-8 text-calryon-teal mb-3" />
                <h3 className="text-xl font-semibold text-calryon-teal dark:text-teal-400 mb-2">Financial Advisory</h3>
                <p>Financial planning, performance analysis, and investment strategy development.</p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <Button size="lg" asChild className="bg-calryon-teal text-white hover:bg-calryon-teal/90 dark:hover:bg-calryon-teal/80 px-10 py-3 text-lg">
                <Link href="/book-appointment?service=Business Consulting">Strategize Your Business Growth</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
