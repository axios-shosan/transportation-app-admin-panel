import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/shared-components/LoadingSpinner';

const TitleAndDate = dynamic(
  () => import('@/components/dashboard/shared-components/Title&Date')
);

const ShipmentDetails = dynamic(
  () => import('@/components/dashboard/shipments/ShipmentDetails')
);

import SidebarLayout from '@/layouts/SidebarLayout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import LoadingPage from '@/components/shared-components/LoadingPage';
import { useGetOneShipmentMutation } from '@/redux/api/shipmentSlice';
import { Shipment } from '@/interfaces/shipment';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const MarketplaceOfferPage = () => {
  const [getShipment, { isLoading }] = useGetOneShipmentMutation();
  const router = useRouter();
  const { shipmentId } = router.query;
  const [shipment, setShipment] = useState<Shipment>();
  const { t } = useTranslation('shipments');

  useEffect(() => {
    getShipment(Number(shipmentId))
      .unwrap()
      .then((res) => {
        setShipment(res);
      })
      .catch((err) => {
        toast.error('Erreur');
      });
  }, []);

  // return a loading spinner if the page is not loaded yet
  if (typeof window == 'undefined') return <LoadingSpinner />;

  if (isLoading || !shipment) return <LoadingPage />;

  return (
    <div className="flex flex-col w-full items-start justify-between ">
      {/* Title & Date */}
      <TitleAndDate title={t('details_page_title')} noSearch />

      {/* Available Offers */}
      <ShipmentDetails shipment={shipment} />
    </div>
  );
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'common',
      'sidebar',
      'shipments',
      'dashboardNavbar'
    ])),
  },
});

export default MarketplaceOfferPage;

MarketplaceOfferPage.getLayout = (page) => (
  <SidebarLayout title="Livraison | Cafila" noFooter>
    {page}
  </SidebarLayout>
);
