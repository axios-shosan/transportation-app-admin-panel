import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/shared-components/LoadingSpinner';
const TitleAndDate = dynamic(
  () => import('@/components/dashboard/shared-components/Title&Date')
);
import SidebarLayout from '@/layouts/SidebarLayout';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
const BidOfferForm = dynamic(
  () => import('@/components/dashboard/marketplace/BidOfferForm')
);

const FillBidFormPage = () => {
  const { t } = useTranslation('market');
  const router = useRouter();
  const { offer_id } = router.query;
  // return a loading spinner if the page is not loaded yet
  if (typeof window == 'undefined') return <LoadingSpinner />;

  return (
    <div className="flex flex-col items-start justify-between ">
      {/* Title & Date */}
      <TitleAndDate title={t('index_title')} noSearch />

      {/* Form */}
      <BidOfferForm offerId={offer_id as any} />
    </div>
  );
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'sidebar', 'market','dashboardNavbar'])),
  },
});

export default FillBidFormPage;

FillBidFormPage.getLayout = (page) => (
  <SidebarLayout title="Marketplace | Cafila" noFooter>
    {page}
  </SidebarLayout>
);
