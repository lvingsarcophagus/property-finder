import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="prose dark:prose-invert max-w-none lg:prose-xl">
          <h1 className="text-4xl font-bold mb-6 text-calryon-gray-dark dark:text-calryon-gray-light">
            Privacy Policy
          </h1>
          <p className="text-calryon-gray-dark dark:text-calryon-gray-light">
            Our commitment to your privacy. Full policy details coming soon.
          </p>

          <h2>Information We Collect</h2>
          <p className="text-calryon-gray-dark dark:text-calryon-gray-light">Placeholder text for Information We Collect section...</p>

          <h2>How We Use Your Information</h2>
          <p className="text-calryon-gray-dark dark:text-calryon-gray-light">Placeholder text for How We Use Your Information section...</p>

          <h2>Data Sharing and Disclosure</h2>
          <p className="text-calryon-gray-dark dark:text-calryon-gray-light">Placeholder text for Data Sharing and Disclosure section...</p>

          <h2>Your Rights</h2>
          <p className="text-calryon-gray-dark dark:text-calryon-gray-light">Placeholder text for Your Rights section...</p>

          <h2>Contact Us</h2>
          <p className="text-calryon-gray-dark dark:text-calryon-gray-light">If you have any questions about this Privacy Policy, please contact us...</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
