import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/shared-components/LoadingSpinner';
const AddTransporter = dynamic(
  () => import('@/components/dashboard/transporters/AddTransporterForm'),
  { ssr: false }
);
import SidebarLayout from '@/layouts/SidebarLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const AddVehiclePage = () => {
  // return a loading spinner if the page is not loaded yet
  if (typeof window == 'undefined') return <LoadingSpinner />;

  return <AddTransporter />;
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'common',
      'sidebar',
      'transporters',
      'dashboardNavbar'
    ])),
  },
});

export default AddVehiclePage;

AddVehiclePage.getLayout = (page) => (
  <SidebarLayout title="Ajouter une véhicule | Cafila" noFooter>
    {page}
  </SidebarLayout>
);
