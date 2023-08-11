import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/shared-components/LoadingSpinner';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
const RegisterFormProvider = dynamic(() =>
  import('@/context/RegisterFormContext').then(
    (mod) => mod.RegisterFormProvider
  )
);
const MultistepRegitrationForm = dynamic(
  () => import('@/components/auth/signup/MultistepRegitration'),
  {
    loading: () => <LoadingSpinner />,
  }
);
const Image = dynamic(() => import('next/image'));
const Layout = dynamic(() => import('@/layouts/BaseLayout'));

const RegisterPage = () => {
  // return a loading spinner if the page is not loaded yet
  if (typeof window == 'undefined') return <LoadingSpinner />;

  return (
    <>
      {/* Background */}
      <Image
        src="/images/png/bg/login-register bg.png"
        alt="auth bg"
        layout="fill"
        className="w-full h-full object-cover opacity-20"
      />

      {/* Form */}
      <RegisterFormProvider>
        <MultistepRegitrationForm />
      </RegisterFormProvider>
    </>
  );
};

export async function getServerSideProps(context: any) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        'common',
        'sidebar',
        'auth',
      ])),
    },
  };
}

export default RegisterPage;

RegisterPage.getLayout = (page) => (
  <Layout title="Créer votre compte | Cafila" noNavbar noFooter>
    {page}
  </Layout>
);
