import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/shared-components/LoadingSpinner';
const TransportersTable = dynamic(
  () => import('@/components/dashboard/transporters/TransportersTable'),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  }
);
const TitleAndDate = dynamic(
  () => import('@/components/dashboard/shared-components/Title&Date')
);
import SidebarLayout from '@/layouts/SidebarLayout';
import { useGetAllTransportersMutation } from '@/redux/api/transporterSlice';
import { Transporter } from '@/interfaces/transporter';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const TransportersPage = () => {
  const [transporters, setTransporters] = useState<Transporter[]>([]);
  const [getAllTranporters, { isLoading }] = useGetAllTransportersMutation();
  const { t } = useTranslation('transporters');

  const fetchTransporters = () => {
    getAllTranporters(null)
      .unwrap()
      .then((res) => {
        setTransporters(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchTransporters();
  }, [getAllTranporters]);

  // return a loading spinner if the page is not loaded yet
  if (typeof window == 'undefined') return <LoadingSpinner />;

  return (
    <div className="flex flex-col w-full items-start justify-between ">
      {/* Title & Date */}
      <TitleAndDate title={t('index_title')} />

      <TransportersTable
        tranporters={transporters}
        fetchTransporters={fetchTransporters}
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
      'transporters',
      'dashboardNavbar'
    ])),
  },
});

export default TransportersPage;

TransportersPage.getLayout = (page) => (
  <SidebarLayout title="Transporteurs | Cafila" noFooter>
    {page}
  </SidebarLayout>
);
