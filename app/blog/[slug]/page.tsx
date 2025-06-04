import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { CalendarDays, UserCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Sample data - in a real app, this would come from a CMS or database via the slug
const samplePostData = {
  title: "Navigating New Immigration Policies in 2024",
  date: "October 26, 2023",
  author: "Dr. Eleanor Vance, Lead Legal Consultant",
  heroImagePlaceholder: true, // Set to true to show a placeholder div
  content: [
    "The landscape of immigration law is ever-evolving, presenting both challenges and opportunities for individuals and businesses alike. Recent policy shifts in 2024 have introduced significant changes that require careful navigation. This article provides an overview of these key changes, discusses their potential impacts, and offers preliminary guidance for those affected.",
    "One of the most notable adjustments involves the criteria for skilled worker visas. The points-based system has been recalibrated, placing greater emphasis on specific high-demand sectors such as technology, healthcare, and renewable energy. Applicants in these fields may find streamlined processes, while others might face more stringent requirements. It's crucial for prospective applicants and employers to thoroughly review these updated criteria.",
    "Family reunification policies have also seen modifications. While the core principles remain, processing times and documentation requirements for certain categories of dependents have been altered. We advise families to consult with an immigration specialist to understand how these changes might affect their specific circumstances.",
    "For businesses, compliance with new employer sanctions and verification processes is paramount. The penalties for non-compliance have increased, underscoring the need for robust internal HR systems to manage foreign national employees. Calryon Group offers comprehensive audits and advisory services to ensure your business remains compliant.",
    "Furthermore, digital nomad visas and short-term work permits are becoming more prevalent in global immigration strategies. Several countries have introduced new schemes to attract remote workers and specialized talent for project-based assignments. These options can offer flexibility but come with their own set of rules regarding taxation and local labor laws.",
    "In conclusion, staying informed and seeking expert advice is more critical than ever. The team at Calryon Group is dedicated to helping clients understand and navigate these complex changes effectively. We encourage you to reach out for a personalized consultation to discuss your specific immigration needs and develop a strategy that aligns with the current legal framework."
  ]
};


export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  // In a real application, you would fetch post data based on the slug
  const post = samplePostData; // Using sample data for this placeholder

  return (
    <>
      <Header />
      <main className="bg-white dark:bg-calryon-gray-dark py-12 md:py-16">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Link href="/blog">
                <Button variant="outline" className="mb-6 text-calryon-teal dark:text-teal-300 border-calryon-teal hover:bg-calryon-teal/10">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
                </Button>
              </Link>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-calryon-gray-dark dark:text-white">
                {post.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-1.5" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <UserCircle className="h-4 w-4 mr-1.5" />
                  <span>By {post.author}</span>
                </div>
              </div>
            </div>

            {post.heroImagePlaceholder && (
              <div className="w-full h-64 md:h-96 bg-calryon-gray-light dark:bg-gray-700 rounded-lg shadow-md mb-8 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Hero Image Placeholder</p>
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none text-calryon-gray-dark dark:text-calryon-gray-light">
              {post.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Placeholder for social sharing, comments, related posts etc. can go here */}
            <div className="mt-12 pt-8 border-t border-calryon-gray-light dark:border-gray-700">
              <h3 className="text-xl font-semibold text-calryon-gray-dark dark:text-white">Share this post:</h3>
              {/* Add social share icons/links here */}
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Social sharing links coming soon.</p>
            </div>

          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
