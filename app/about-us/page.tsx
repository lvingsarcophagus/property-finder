import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { Users, Target, Eye, Zap, ShieldCheck } from 'lucide-react';

export default function AboutUsPage() {
  const values = [
    { name: "Integrity", description: "We uphold the highest standards of integrity in all of our actions.", icon: ShieldCheck },
    { name: "Client Focus", description: "Our clients' success is our primary motivation. We are committed to their needs.", icon: Users },
    { name: "Excellence", description: "We strive for excellence in every project, delivering outstanding results.", icon: Zap },
    { name: "Innovation", description: "We embrace innovation to provide cutting-edge solutions.", icon: Target },
  ];

  return (
    <>
      <Header />
      <main className="bg-white dark:bg-calryon-gray-dark">
        {/* Hero Section for About Us */}
        <section className="bg-calryon-teal text-white py-16 md:py-24">
          <div className="container mx-auto px-6 text-center">
            <Users className="mx-auto h-16 w-16 mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Calryon Group</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Discover our mission, vision, values, and the story behind our commitment to excellence in consultancy.
            </p>
          </div>
        </section>

        {/* Mission, Vision, Background Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16 md:mb-24">
              <div className="prose prose-lg dark:prose-invert max-w-none text-calryon-gray-dark dark:text-calryon-gray-light">
                <Target className="h-10 w-10 text-calryon-teal mb-3" />
                <h2 className="text-3xl font-semibold text-calryon-teal dark:text-teal-400">Our Mission</h2>
                <p>
                  To empower organizations and individuals through expert consultancy services, fostering growth, innovation, and sustainable success across legal, HR, education, and business sectors. We are dedicated to providing strategic insights and practical solutions tailored to the unique needs of each client.
                </p>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none text-calryon-gray-dark dark:text-calryon-gray-light">
                <Eye className="h-10 w-10 text-calryon-teal mb-3" />
                <h2 className="text-3xl font-semibold text-calryon-teal dark:text-teal-400">Our Vision</h2>
                <p>
                  To be the leading consultancy group recognized for our transformative impact on clients and industries globally. We aspire to set new standards of excellence and to be a catalyst for positive change and development in the communities we serve.
                </p>
              </div>
            </div>

            <div className="bg-calryon-gray-light dark:bg-gray-900 p-8 md:p-12 rounded-xl shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-calryon-gray-dark dark:text-white">
                Our Story
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-3xl mx-auto text-calryon-gray-dark dark:text-calryon-gray-light text-justify">
                <p>
                  Founded on the principles of expertise and client partnership, Calryon Group emerged from a desire to provide comprehensive and accessible consulting. Our journey began over a decade ago, with a small team of passionate experts dedicated to making a difference.
                </p>
                <p>
                  Over the years, we have expanded our reach and deepened our expertise, growing into a multidisciplinary consultancy that serves a diverse clientele ranging from startups to established enterprises. Our commitment to delivering measurable results and building long-term relationships remains at the core of our identity. We believe in a collaborative approach, working closely with our clients to understand their challenges and co-create solutions that drive lasting value.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-calryon-gray-light dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-calryon-gray-dark dark:text-white">Our Core Values</h2>
              <p className="text-lg mt-2 text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
                The principles that guide our work and define our culture.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.name} className="bg-white dark:bg-calryon-gray-dark p-6 rounded-lg shadow-lg text-center">
                    <Icon className="mx-auto h-12 w-12 text-calryon-teal mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-calryon-teal dark:text-teal-400">{value.name}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
