import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/shared-components/LoadingSpinner';

const TitleAndDate = dynamic(
  () => import('@/components/dashboard/shared-components/Title&Date')
);
import SidebarLayout from '@/layouts/SidebarLayout';
import BidInfos from '@/components/dashboard/marketplace/BidInfos';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useGetOfferMutation } from '@/redux/api/bidSlice';
import LoadingPage from '@/components/shared-components/LoadingPage';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { toast } from 'react-toastify';

const MarketplaceOfferPage = () => {
  const [getOffer, { data, isLoading }] = useGetOfferMutation();
  const router = useRouter();
  const { offer_id } = router.query;
  const [offer, setOffer] = useState<any>(null);
  const { t } = useTranslation('market');

  useEffect(() => {
    getOffer(Number(offer_id))
      .unwrap()
      .then((res) => {
        setOffer(res);
      })
      .catch((err) => {
        toast.error(err?.data || 'Error');
      });
  }, []);

  // return a loading spinner if the page is not loaded yet
  if (typeof window == 'undefined') return <LoadingSpinner />;
  if (!offer || isLoading) return <LoadingPage />;

  return (
    <div className="flex flex-col w-full items-start justify-between ">
      {/* Title & Date */}
      <TitleAndDate title={t('index_title')} noSearch />

      {/* Available Offers */}
      <BidInfos offer={offer} />
    </div>
  );
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'sidebar', 'market', 'dashboardNavbar'])),
  },
});

export default MarketplaceOfferPage;

MarketplaceOfferPage.getLayout = (page) => (
  <SidebarLayout title="Marketplace | Cafila" noFooter>
    {page}
  </SidebarLayout>
);
