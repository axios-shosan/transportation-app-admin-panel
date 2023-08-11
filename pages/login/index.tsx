import dynamic from 'next/dynamic';
const Image = dynamic(() => import('next/image'), {
  loading: () => <LoadingSpinner />,
});
const LoginForm = dynamic(() => import('@/components/auth/signin/LoginForm'), {
  loading: () => <LoadingSpinner />,
});
const Layout = dynamic(() => import('@/layouts/BaseLayout'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});
import { getCsrfToken } from 'next-auth/react';
import LoadingSpinner from '@/components/shared-components/LoadingSpinner';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type Props = {
  csrfToken: string;
};

const LoginPage = ({ csrfToken }: Props) => {
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
      <div className="z-10 w-full h-screen flex items-center justify-center">
        <LoginForm csrfToken={csrfToken} />
      </div>
    </>
  );
};

export default LoginPage;

LoginPage.getLayout = (page) => (
  <Layout title="Connecter | Cafila" noNavbar noFooter>
    {page}
  </Layout>
);

export async function getServerSideProps(context: any) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      csrfToken,
      ...(await serverSideTranslations(context.locale, [
        'common',
        'sidebar',
        'auth',
      ])),
    },
  };
}
