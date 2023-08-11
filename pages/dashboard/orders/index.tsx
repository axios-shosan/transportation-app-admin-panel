import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/shared-components/LoadingSpinner';
const TitleAndDate = dynamic(
  () => import('@/components/dashboard/shared-components/Title&Date')
);
const DashboardStats = dynamic(
  () => import('@/components/dashboard/DashboardStats'),
  { ssr: false }
);
import SidebarLayout from '@/layouts/SidebarLayout';

const OrdersPage = () => {
  // return a loading spinner if the page is not loaded yet
  if (typeof window == 'undefined') return <LoadingSpinner />;

  return (
    <div className="flex flex-col w-full items-start justify-between ">
      {/* Title & Date */}
      <TitleAndDate title="Tableau de bord" />

      {/* Stats Cards */}
      <DashboardStats />
    </div>
  );
};

export default OrdersPage;

OrdersPage.getLayout = (page) => (
  <SidebarLayout title="Commandes | Cafila" noFooter>
    {page}
  </SidebarLayout>
);
