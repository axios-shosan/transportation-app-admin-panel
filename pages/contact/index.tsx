import dynamic from 'next/dynamic';
const ContactForm = dynamic(() => import('@/components/contact/ContactForm'));
import Layout from '@/layouts/BaseLayout';
import LoadingPage from '@/components/shared-components/LoadingPage';

const ContactPage = () => {
  // return a loading spinner if the page is not loaded yet
  if (typeof window == 'undefined') return <LoadingPage />;

  return (
    <div className="w-10/12 h-[80vh] mx-auto mt-12 mb-20">
      <h1 className="text-3xl font-semibold w-full text-center lg:text-5xl md:text-4xl">
        CONTACTEZ-NOUS.
      </h1>

      {/* Contact Form */}
      <ContactForm />
    </div>
  );
};

export default ContactPage;

ContactPage.getLayout = (page) => (
  <Layout title="Contactez-nous | Cafila">{page}</Layout>
);
