import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/shared-components/LoadingSpinner';

const TitleAndDate = dynamic(
  () => import('@/components/dashboard/shared-components/Title&Date')
);
const BidDetails = dynamic(
  () => import('@/components/dashboard/bids/BidDetails')
);
import SidebarLayout from '@/layouts/SidebarLayout';
import BidInfos from '@/components/dashboard/marketplace/BidInfos';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  useGetOfferMutation,
  useGetOneBidMutation,
} from '@/redux/api/bidSlice';
import { Bid } from '@/interfaces/bid';
import { toast } from 'react-toastify';
import LoadingPage from '@/components/shared-components/LoadingPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const MarketplaceOfferPage = () => {
  const [getBid, { data, isLoading }] = useGetOneBidMutation();
  const router = useRouter();
  const { bidId, offerId } = router.query;
  const [bid, setBid] = useState<Bid>();
  const { t } = useTranslation('bids');

  useEffect(() => {
    getBid(Number(bidId))
      .unwrap()
      .then((res) => {
        setBid(res);
      })
      .catch((err) => {
        toast.error('Erreur');
      });
  }, []);

  // return a loading spinner if the page is not loaded yet
  if (typeof window == 'undefined') return <LoadingSpinner />;

  if (isLoading || !bid) return <LoadingPage />;

  return (
    <div className="flex flex-col w-full items-start justify-between ">
      {/* Title & Date */}
      <TitleAndDate title={t('details_page_title')} noSearch />

      {/* Available Offers */}
      <BidDetails bid={bid} offerId={Number(offerId)} />
    </div>
  );
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'sidebar', 'bids','dashboardNavbar'])),
  },
});

export default MarketplaceOfferPage;

MarketplaceOfferPage.getLayout = (page) => (
  <SidebarLayout title="L'offre | Cafila" noFooter>
    {page}
  </SidebarLayout>
);
