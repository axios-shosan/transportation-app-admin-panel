import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/shared-components/LoadingSpinner';
const AddVehicleForm = dynamic(
  () => import('@/components/dashboard/vehicles/AddVehicleForm'),
  { ssr: false }
);
import SidebarLayout from '@/layouts/SidebarLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const AddVehiclePage = () => {
  // return a loading spinner if the page is not loaded yet
  if (typeof window == 'undefined') return <LoadingSpinner />;

  return <AddVehicleForm />;
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'common',
      'sidebar',
      'vehicles',
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
