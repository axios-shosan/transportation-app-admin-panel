import dynamic from 'next/dynamic';
const ModifyTranporter = dynamic(
  () => import('@/components/dashboard/transporters/UpdateTransporterForm'),
  { ssr: false }
);
import SidebarLayout from '@/layouts/SidebarLayout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingPage from '@/components/shared-components/LoadingPage';
import { useGetOneTransoprterMutation } from '@/redux/api/transporterSlice';
import { Transporter } from '@/interfaces/transporter';
import { toast } from 'react-toastify';
import { useGetOneVehicleMutation } from '@/redux/api/vehicleSlice';
import { Vehicle } from '@/interfaces/vehicle';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
const UpdateVehicleForm = dynamic(
  () => import('@/components/dashboard/vehicles/UpdateForm')
);

const UpdateVehicle = () => {
  // return a loading spinner if the page is not loaded yet
  if (typeof window == 'undefined') return <LoadingPage />;

  const [getVehicle, { isLoading }] = useGetOneVehicleMutation();
  const [vehicle, setVehicle] = useState<Vehicle>();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getVehicle(Number(id))
      .unwrap()
      .then((res) => {
        setVehicle(res);
      })
      .catch((err) => {
        toast.error('Erreur');
        router.push('/dashboard/transporters');
      });
  }, []);

  if (isLoading || !vehicle) return <LoadingPage />;
  return <UpdateVehicleForm record={vehicle} />;
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

export default UpdateVehicle;

UpdateVehicle.getLayout = (page) => (
  <SidebarLayout title="Ajouter une véhicule | Cafila" noFooter>
    {page}
  </SidebarLayout>
);
