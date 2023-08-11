import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
const ShipmentsTable = dynamic(
  () => import('@/components/dashboard/shipments/ShipmentsTable'),
  {
    loading: () => <LoadingPage />,
    ssr: false,
  }
);
import LoadingSpinner from '@/components/shared-components/LoadingSpinner';
import { Shipment } from '@/interfaces/shipment';
import { useGetAllShipmentsMutation } from '@/redux/api/shipmentSlice';
const TitleAndDate = dynamic(
  () => import('@/components/dashboard/shared-components/Title&Date')
);
import SidebarLayout from '@/layouts/SidebarLayout';
import LoadingPage from '@/components/shared-components/LoadingPage';
import { searchShipments } from '@/lib/search';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';

const ShipmentsPage = () => {
  const { t } = useTranslation('shipments');
  const [getAllShipments, { isLoading }] = useGetAllShipmentsMutation();
  const [shipments, setShipments] = useState<Shipment[]>([]);

  const fetchShipments = () => {
    getAllShipments(null)
      .unwrap()
      .then((res) => {
        setShipments(res);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.data || err?.message || 'Erreur');
      });
  };

  useEffect(() => {
    fetchShipments();
  }, [getAllShipments]);

  const handleSearchShipments = (search: string) => {
    if (search === '') {
      fetchShipments();
      return;
    }
    // search inside shipments array
    // search inside shipments array
    const filteredShipments = searchShipments(shipments, search);
    setShipments(filteredShipments);
  };

  // return a loading spinner if the page is not loaded yet
  if (typeof window == 'undefined') return <LoadingSpinner />;

  return (
    <Suspense fallback={<LoadingPage />}>
      <div className="flex flex-col w-full items-start justify-between ">
        {/* Title & Date */}
        <TitleAndDate
          title={t('index_title')}
          handleSearch={handleSearchShipments}
        />

        {/* Shipments */}
        <ShipmentsTable shipments={shipments} isLoading={isLoading} />
      </div>
    </Suspense>
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

export default ShipmentsPage;

ShipmentsPage.getLayout = (page) => (
  <SidebarLayout title="Livraisons | Cafila" noFooter>
    {page}
  </SidebarLayout>
);
