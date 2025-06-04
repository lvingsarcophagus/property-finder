import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Newspaper, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function BlogIndexPage() {
  const posts = [
    { slug: "navigating-new-immigration-policies", title: "Navigating New Immigration Policies in 2024", date: "October 26, 2023", excerpt: "A detailed look into the recent shifts in immigration law and how they might affect individuals and businesses. We cover key changes, potential impacts, and offer preliminary advice..." },
    { slug: "the-future-of-hr-trends-to-watch", title: "The Future of HR: Key Trends to Watch in the Coming Years", date: "October 15, 2023", excerpt: "The HR landscape is constantly evolving. This post explores emerging trends such as AI in recruitment, remote work policies, employee wellness programs, and data analytics in HR..." },
    { slug: "maximizing-business-growth-strategies", title: "Maximizing Business Growth: Proven Strategies for Success", date: "September 28, 2023", excerpt: "Discover effective strategies for sustainable business expansion, including market penetration, product development, diversification, and strategic partnerships. Learn how to scale your operations..." },
    { slug: "understanding-gdpr-a-refresher", title: "Understanding GDPR: A Quick Refresher for Your Business", date: "September 10, 2023", excerpt: "A concise overview of the General Data Protection Regulation (GDPR), its core principles, and why ongoing compliance is crucial for businesses handling personal data..." },
  ];

  return (
    <>
      <Header />
      <main className="bg-white dark:bg-calryon-gray-dark">
        {/* Hero Section for Blog */}
        <section className="bg-calryon-gray-light dark:bg-gray-900 py-16 md:py-20">
          <div className="container mx-auto px-6 text-center">
            <Newspaper className="mx-auto h-16 w-16 text-calryon-teal mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-calryon-gray-dark dark:text-white">Calryon Group Blog</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-700 dark:text-calryon-gray-light">
              Insights, analysis, and updates from our team of experts across various consulting fields.
            </p>
          </div>
        </section>

        {/* Blog Post List */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.slug} className="bg-white dark:bg-calryon-gray-dark border border-calryon-gray-light dark:border-gray-700 rounded-lg shadow-lg overflow-hidden flex flex-col">
                  {/* Placeholder for image: <div className="h-48 bg-calryon-gray-light dark:bg-gray-700"></div> */}
                  <div className="p-6 flex-grow">
                    <h2 className="text-2xl font-semibold mb-3 text-calryon-teal dark:text-teal-400 hover:underline">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{post.date}</p>
                    <p className="text-gray-700 dark:text-calryon-gray-light mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="p-6 pt-0">
                    <Button variant="link" asChild className="text-calryon-teal dark:text-teal-300 p-0">
                      <Link href={`/blog/${post.slug}`}>Read More <ArrowRight className="ml-1 h-4 w-4" /></Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            {/* Placeholder Pagination */}
            <nav className="mt-16 flex items-center justify-center space-x-4">
              <Button variant="outline" disabled>
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <span className="text-calryon-gray-dark dark:text-calryon-gray-light">Page 1 of X</span>
              <Button variant="outline">
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </nav>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
