import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function GDPRPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="prose dark:prose-invert max-w-none lg:prose-xl">
          <h1 className="text-4xl font-bold mb-6 text-calryon-gray-dark dark:text-calryon-gray-light">
            GDPR Compliance
          </h1>
          <p className="text-calryon-gray-dark dark:text-calryon-gray-light">
            Our commitment to General Data Protection Regulation (GDPR). Full details coming soon.
          </p>

          <h2>Our Role as Data Controller/Processor</h2>
          <p className="text-calryon-gray-dark dark:text-calryon-gray-light">Placeholder text for our role...</p>

          <h2>Lawful Basis for Processing</h2>
          <p className="text-calryon-gray-dark dark:text-calryon-gray-light">Placeholder text for lawful basis...</p>

          <h2>Data Subject Rights</h2>
          <p className="text-calryon-gray-dark dark:text-calryon-gray-light">Placeholder text for data subject rights (access, rectification, erasure, etc.)...</p>

          <h2>Data Transfers</h2>
          <p className="text-calryon-gray-dark dark:text-calryon-gray-light">Placeholder text for data transfers, if applicable...</p>

          <h2>Contact Information for GDPR Inquiries</h2>
          <p className="text-calryon-gray-dark dark:text-calryon-gray-light">For any GDPR related questions, please contact our Data Protection Officer at...</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
