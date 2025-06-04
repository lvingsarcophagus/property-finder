import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { Award, MessageSquareText, Star } from 'lucide-react'; // Star for rating (optional)

export default function TestimonialsPage() {
  const testimonials = [
    {
      id: 1,
      quote: "Calryon Group's legal team provided exceptional advice that was crucial for our business expansion into new markets. Their expertise in international business law is unmatched. Highly recommended!",
      clientName: "Johnathan M. Doe",
      title: "CEO, TechExpand Solutions",
      service: "Business Law Consulting",
      date: "August 15, 2023",
      rating: 5, // Optional rating
    },
    {
      id: 2,
      quote: "The HR consulting services we received transformed our internal processes and company culture. Employee satisfaction has visibly improved. A true game-changer for our organization!",
      clientName: "Sarah L. Jennings",
      title: "HR Director, Innovatech Ltd.",
      service: "HR Services",
      date: "June 05, 2023",
      rating: 5,
    },
    {
      id: 3,
      quote: "Navigating the complexities of immigration law was daunting, but Calryon Group made the process smooth and understandable. Their consultants are knowledgeable and supportive.",
      clientName: "Aisha Khan",
      title: "Individual Client",
      service: "Immigration Law",
      date: "September 22, 2023",
      rating: 5,
    },
     {
      id: 4,
      quote: "The education consulting team helped us revamp our curriculum to meet international standards. The results have been fantastic, with improved student engagement and outcomes.",
      clientName: "Dr. Robert Green",
      title: "Principal, Global Learning Academy",
      service: "Education Consulting",
      date: "July 10, 2023",
      rating: 4,
    },
  ];

  return (
    <>
      <Header />
      <main className="bg-white dark:bg-calryon-gray-dark">
        {/* Hero Section for Testimonials */}
        <section className="bg-calryon-gray-light dark:bg-gray-900 py-16 md:py-20">
          <div className="container mx-auto px-6 text-center">
            <Award className="mx-auto h-16 w-16 text-calryon-teal mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-calryon-gray-dark dark:text-white">Client Testimonials</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-700 dark:text-calryon-gray-light">
              Hear from satisfied clients who have partnered with Calryon Group for their consulting needs.
            </p>
          </div>
        </section>

        {/* Testimonials List */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white dark:bg-calryon-gray-dark border border-calryon-gray-light dark:border-gray-700 rounded-xl shadow-xl p-8 flex flex-col">
                  <MessageSquareText className="h-10 w-10 text-calryon-teal mb-6" />
                  <p className="italic text-lg text-gray-700 dark:text-calryon-gray-light mb-6 flex-grow">
                    "{testimonial.quote}"
                  </p>
                  <div className="mt-auto">
                    <p className="font-bold text-calryon-teal dark:text-teal-400 text-lg">{testimonial.clientName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Service: {testimonial.service}</p>
                    {testimonial.rating && (
                      <div className="flex items-center mt-2">
                        {Array(testimonial.rating).fill(0).map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ))}
                        {Array(5 - testimonial.rating).fill(0).map((_, i) => (
                          <Star key={i+testimonial.rating} className="h-5 w-5 text-gray-300 dark:text-gray-600" />
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-400 dark:text-gray-600 mt-2">Date: {testimonial.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
