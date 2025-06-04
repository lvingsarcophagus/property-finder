import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen, GraduationCap, TrendingUp, Lightbulb } from 'lucide-react';

export default function EducationConsultingPage() {
  return (
    <>
      <Header />
      <main className="bg-white dark:bg-calryon-gray-dark">
        {/* Hero Section for Education Consulting */}
        <section className="bg-calryon-teal text-white py-16 md:py-20">
          <div className="container mx-auto px-6 text-center">
            <GraduationCap className="mx-auto h-16 w-16 mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Education Consulting</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Fostering excellence and innovation in education through expert guidance and strategic solutions.
            </p>
          </div>
        </section>

        {/* Detailed Description */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="prose prose-lg dark:prose-invert max-w-3xl mx-auto text-calryon-gray-dark dark:text-calryon-gray-light mb-12">
              <h2 className="text-3xl font-semibold text-calryon-teal dark:text-teal-400 mb-4">
                Advancing Educational Excellence
              </h2>
              <p>
                Calryon Group's Education Consulting division is committed to supporting educational institutions, students, and organizations in achieving their academic and strategic objectives. We offer a comprehensive suite of services designed to enhance learning outcomes, improve institutional effectiveness, and promote innovation in the ever-evolving field of education.
              </p>
              <p>
                Our team of experienced education consultants brings a wealth of knowledge in curriculum development, pedagogical strategies, educational technology integration, policy formulation, and institutional management. We work collaboratively with schools, colleges, universities, and educational businesses to develop tailored solutions that address specific challenges and opportunities.
              </p>
              <p>
                From guiding students on their academic pathways to assisting institutions with accreditation and quality assurance, our focus is on delivering impactful results that contribute to a brighter future for learners and educators alike.
              </p>
            </div>

            {/* Example Sub-sections or Key Offerings */}
            <div className="grid md:grid-cols-2 gap-8 mb-12 text-calryon-gray-dark dark:text-calryon-gray-light">
              <div className="bg-calryon-gray-light dark:bg-gray-900 p-6 rounded-lg shadow">
                <BookOpen className="h-8 w-8 text-calryon-teal mb-3" />
                <h3 className="text-xl font-semibold text-calryon-teal dark:text-teal-400 mb-2">Curriculum Development</h3>
                <p>Designing and refining curricula to meet modern educational standards and learner needs.</p>
              </div>
              <div className="bg-calryon-gray-light dark:bg-gray-900 p-6 rounded-lg shadow">
                <Lightbulb className="h-8 w-8 text-calryon-teal mb-3" />
                <h3 className="text-xl font-semibold text-calryon-teal dark:text-teal-400 mb-2">Institutional Strategy</h3>
                <p>Providing strategic planning and policy advice for educational institutions seeking growth and improvement.</p>
              </div>
               <div className="bg-calryon-gray-light dark:bg-gray-900 p-6 rounded-lg shadow">
                <TrendingUp className="h-8 w-8 text-calryon-teal mb-3" />
                <h3 className="text-xl font-semibold text-calryon-teal dark:text-teal-400 mb-2">Student Advisory</h3>
                <p>Guiding students through academic choices, career planning, and international education opportunities.</p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <Button size="lg" asChild className="bg-calryon-teal text-white hover:bg-calryon-teal/90 dark:hover:bg-calryon-teal/80 px-10 py-3 text-lg">
                <Link href="/book-appointment?service=Education Consulting">Consult on Education Strategies</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
