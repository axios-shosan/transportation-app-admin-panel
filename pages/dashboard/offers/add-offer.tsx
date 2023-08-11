import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/shared-components/LoadingSpinner';
const AddOfferForm = dynamic(
  () => import('@/components/dashboard/offers/AddOfferForm'),
  { ssr: false }
);
import SidebarLayout from '@/layouts/SidebarLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const AddVehiclePage = () => {
  // return a loading spinner if the page is not loaded yet
  if (typeof window == 'undefined') return <LoadingSpinner />;

  return <AddOfferForm />;
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'sidebar', 'offers','dashboardNavbar'])),
  },
});

export default AddVehiclePage;

AddVehiclePage.getLayout = (page) => (
  <SidebarLayout title="Ajouter Un Offre | Cafila" noFooter>
    {page}
  </SidebarLayout>
);
