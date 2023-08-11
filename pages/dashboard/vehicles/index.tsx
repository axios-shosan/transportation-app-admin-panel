import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/shared-components/LoadingSpinner';
import { useGetAllVehiclesMutation } from '@/redux/api/vehicleSlice';
const VehiclesTable = dynamic(
  () => import('@/components/dashboard/vehicles/VehiclesTable'),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  }
);
const TitleAndDate = dynamic(
  () => import('@/components/dashboard/shared-components/Title&Date')
);
import SidebarLayout from '@/layouts/SidebarLayout';
import { Vehicle } from '@/interfaces/vehicle';
import { searchVehicles } from '@/lib/search';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [getAllVehicles, { isLoading }] = useGetAllVehiclesMutation();
  const { t } = useTranslation('vehicles');

  const fetchVehicles = () => {
    getAllVehicles(null)
      .unwrap()
      .then((res) => {
        setVehicles(res);
      })
      .catch((err) => {
        toast.error(err?.data || 'Error');
      });
  };

  useEffect(() => {
    fetchVehicles();
  }, [getAllVehicles]);

  const handleSearchVehicles = (search: string) => {
    if (search === '') {
      fetchVehicles();
      return;
    }
    // search inside shipments array
    const filteredVehicles = searchVehicles(vehicles, search);
    setVehicles(filteredVehicles);
  };

  // return a loading spinner if the page is not loaded yet
  if (typeof window == 'undefined') return <LoadingSpinner />;

  return (
    <div className="flex flex-col w-full items-start justify-between ">
      {/* Title & Date */}
      <TitleAndDate
        title={t('index_title')}
        handleSearch={handleSearchVehicles}
      />

      {/* Vehicles */}
      <VehiclesTable
        vehicles={vehicles}
        fetchVehicles={fetchVehicles}
        isLoading={isLoading}
      />
    </div>
  );
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

export default VehiclesPage;

VehiclesPage.getLayout = (page) => (
  <SidebarLayout title="Vehicules | Cafila" noFooter>
    {page}
  </SidebarLayout>
);
