import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/shared-components/LoadingSpinner';
const AddShipmentForm = dynamic(
  () => import('@/components/dashboard/shipments/AddShipmentForm'),
  { ssr: false }
);
import SidebarLayout from '@/layouts/SidebarLayout';

const AddShipmentPage = () => {
  // return a loading spinner if the page is not loaded yet
  if (typeof window == 'undefined') return <LoadingSpinner />;

  return <AddShipmentForm />;
};

export default AddShipmentPage;

AddShipmentPage.getLayout = (page) => (
  <SidebarLayout title="Ajouter une livraison | Cafila" noFooter>
    {page}
  </SidebarLayout>
);
