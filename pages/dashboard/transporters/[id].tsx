import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/shared-components/LoadingSpinner';
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
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const AddVehiclePage = () => {
  // return a loading spinner if the page is not loaded yet
  if (typeof window == 'undefined') return <LoadingPage />;

  const [getTransporter, { isLoading }] = useGetOneTransoprterMutation();
  const [tranporter, setTransporter] = useState<Transporter>();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getTransporter(Number(id))
      .unwrap()
      .then((res) => {
        setTransporter(res);
      })
      .catch((err) => {
        toast.error('Erreur');
        router.push('/dashboard/transporters');
      });
  }, []);

  if (isLoading || !tranporter) return <LoadingPage />;
  return <ModifyTranporter record={tranporter} />;
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
  <SidebarLayout title="Transporteurs | Cafila" noFooter>
    {page}
  </SidebarLayout>
);
