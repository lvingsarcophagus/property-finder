import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquareText, Newspaper, Users } from 'lucide-react';

export default function HomePage() {
  const blogPosts = [
    { id: 1, title: "Navigating New Immigration Policies", snippet: "A brief look at the recent changes and what they mean for you...", href: "/blog/sample-post-1" },
    { id: 2, title: "The Future of HR: Trends to Watch", snippet: "Exploring the evolving landscape of human resources...", href: "/blog/sample-post-2" },
    { id: 3, title: "Maximizing Business Growth in 2024", snippet: "Strategies for sustainable expansion and success...", href: "/blog/sample-post-3" },
  ];

  const testimonials = [
    { id: 1, quote: "Calryon Group provided exceptional legal advice that was crucial for our business. Highly recommended!", clientName: "John Doe, CEO of TechCorp" },
    { id: 2, quote: "Their HR consulting services transformed our internal processes. A game-changer!", clientName: "Jane Smith, HR Director at Innovate Ltd." },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-calryon-teal text-white">
          <div className="container mx-auto px-6 py-20 md:py-32 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Expert Guidance, Tangible Results.
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto text-calryon-gray-light opacity-90">
              Calryon Group delivers strategic consulting solutions in Legal, HR, Education, and Business sectors to help you achieve your goals.
            </p>
            <div className="space-x-4">
              <Button size="lg" asChild className="bg-white text-calryon-teal hover:bg-calryon-gray-light px-8 py-3 text-lg">
                <Link href="/services">Our Services <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-white text-white hover:bg-white hover:text-calryon-teal px-8 py-3 text-lg">
                <Link href="/book-appointment">Book an Appointment</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Intro to Services */}
        <section className="py-16 md:py-24 bg-white dark:bg-calryon-gray-dark">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-calryon-gray-dark dark:text-white">
              Comprehensive Consulting Services
            </h2>
            <p className="text-lg mb-10 max-w-2xl mx-auto text-gray-700 dark:text-calryon-gray-light">
              We provide a wide array of specialized consulting services. From navigating complex legal frameworks and optimizing human resources, to advancing educational programs and strategizing for business excellence, Calryon Group is your trusted partner.
            </p>
            <Button variant="default" size="lg" asChild>
              <Link href="/services">Explore All Services <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </section>

        {/* Dynamic Blog Post Previews (Placeholder) */}
        <section className="py-16 md:py-24 bg-calryon-gray-light dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <Newspaper className="mx-auto h-12 w-12 text-calryon-teal mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-calryon-gray-dark dark:text-white">
                Latest Insights
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
                Stay informed with our expert analysis and commentary on current trends.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-white dark:bg-calryon-gray-dark p-6 rounded-lg shadow-lg flex flex-col">
                  <h3 className="text-xl font-semibold mb-3 text-calryon-teal dark:text-teal-400">{post.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">{post.snippet}</p>
                  <Button variant="link" asChild className="text-calryon-teal dark:text-teal-300 p-0 self-start">
                    <Link href={post.href}>Read More <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Testimonials (Placeholder) */}
        <section className="py-16 md:py-24 bg-white dark:bg-calryon-gray-dark">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <Users className="mx-auto h-12 w-12 text-calryon-teal mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-calryon-gray-dark dark:text-white">
                What Our Clients Say
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-calryon-gray-light dark:bg-gray-900 p-8 rounded-lg shadow-lg">
                  <MessageSquareText className="h-8 w-8 text-calryon-teal mb-4" />
                  <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-6">"{testimonial.quote}"</p>
                  <p className="font-semibold text-right text-calryon-gray-dark dark:text-white">- {testimonial.clientName}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* General CTAs */}
        <section className="py-16 md:py-24 bg-calryon-teal text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Elevate Your Strategy?
            </h2>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-90">
              Let Calryon Group be your partner in success. Contact us today for a personalized consultation and discover how our expertise can drive your growth.
            </p>
            <div className="space-x-4">
            <Button size="lg" asChild className="bg-white text-calryon-teal hover:bg-calryon-gray-light px-8 py-3 text-lg">
                <Link href="/contact-us">Contact Us Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-white text-white hover:bg-white hover:text-calryon-teal px-8 py-3 text-lg">
                <Link href="/book-appointment">Book a Consultation</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
