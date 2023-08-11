import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import BidOnOffer from '@/components/dashboard/marketplace/BidModal';
import LoadingSpinner from '@/components/shared-components/LoadingSpinner';

const BidsTable = dynamic(
  () => import('@/components/dashboard/bids/BidsTable'),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  }
);
const TitleAndDate = dynamic(
  () => import('@/components/dashboard/shared-components/Title&Date')
);
import SidebarLayout from '@/layouts/SidebarLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const OffersPage = () => {
  const { t } = useTranslation('bids');
  // return a loading spinner if the page is not loaded yet
  if (typeof window == 'undefined') return <LoadingSpinner />;

  return (
    <div className="flex flex-col w-full items-start justify-between ">
      {/* Title & Date */}
      <TitleAndDate title={t('bids_page_title')} />

      {/* Vehicles */}
      <BidsTable />
    </div>
  );
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'sidebar', 'bids','dashboardNavbar'])),
  },
});

export default OffersPage;

OffersPage.getLayout = (page) => (
  <SidebarLayout title="Les Enchaires | Cafila" noFooter>
    {page}
  </SidebarLayout>
);
