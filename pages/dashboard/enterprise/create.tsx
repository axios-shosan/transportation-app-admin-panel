import dynamic from 'next/dynamic';
import LoadingPage from '@/components/shared-components/LoadingPage';
import LoadingSpinner from '@/components/shared-components/LoadingSpinner';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Image = dynamic(() => import('next/image'), {
  loading: () => <LoadingPage />,
});
const CreateForm = dynamic(
  () => import('@/components/dashboard/enterprise/CreateEnterpriseForm'),
  {
    loading: () => <LoadingSpinner />,
  }
);
const Layout = dynamic(() => import('@/layouts/BaseLayout'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

type Props = {};

export default function CreateEnterprise({}: Props) {
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
      <div className="z-10 w-full flex items-center justify-center my-6">
        <CreateForm />
      </div>
    </>
  );
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'common',
      'sidebar',
      'enterprise',
      'dashboardNavbar'
    ])),
  },
});

CreateEnterprise.getLayout = (page) => (
  <Layout title="Enterprise | Cafila" noFooter>
    {page}
  </Layout>
);
