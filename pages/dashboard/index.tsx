import dynamic from 'next/dynamic';
import SidebarLayout from '@/layouts/SidebarLayout';
import LoadingSpinner from '@/components/shared-components/LoadingSpinner';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
const TitleAndDate = dynamic(
  () => import('@/components/dashboard/shared-components/Title&Date')
);
const DashboardStats = dynamic(
  () => import('@/components/dashboard/DashboardStats'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);
const DashboardCharts = dynamic(
  () => import('@/components/dashboard/DashboardCharts'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

const DashboardPage = () => {
  // return a loading spinner if the page is not loaded yet
  if (typeof window == 'undefined') return <LoadingSpinner />;
  const { t } = useTranslation('dashboard');

  return (
    <div className="w-[98%] flex flex-col items-start justify-between md:w-full">
      {/* Title & Date */}
      <TitleAndDate title={t('title')} noSearch />
      <div className="w-full">
        {/* Stats Cards */}
        <DashboardStats />

        {/* Charts */}
        <DashboardCharts />
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'common',
      'sidebar',
      'dashboard',
      'dashboardNavbar'
    ])),
  },
});

export default DashboardPage;

DashboardPage.getLayout = (page) => (
  <SidebarLayout title="Tableau de bord | Cafila" noFooter>
    {page}
  </SidebarLayout>
);
