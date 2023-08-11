import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/shared-components/LoadingSpinner';

const OffersTable = dynamic(
  () => import('@/components/dashboard/marketplace/MarketplaceTable'),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  }
);
const TitleAndDate = dynamic(
  () => import('@/components/dashboard/shared-components/Title&Date')
);
import SidebarLayout from '@/layouts/SidebarLayout';
import { useEffect, useState } from 'react';
import { useGetAllOffersMutation } from '@/redux/api/offerSlice';
import { toast } from 'react-toastify';
import { Offer } from '@/interfaces/offer';
import { searchOffers } from '@/lib/search';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const OffersPage = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [getAllOffers, { isLoading }] = useGetAllOffersMutation();
  const { t } = useTranslation('market');

  const fetchOffers = () => {
    getAllOffers(null)
      .unwrap()
      .then((res) => {
        setOffers(res);
      })
      .catch((err) => {
        toast.error(err.data);
        console.error(err);
      });
  };

  useEffect(() => {
    fetchOffers();
  }, [getAllOffers]);

  const handleSearchOffers = (search: string) => {
    if (search === '') {
      fetchOffers();
      return;
    }
    // search inside offers array
    const filteredOffers = searchOffers(offers, search);
    setOffers(filteredOffers);
  };
  // return a loading spinner if the page is not loaded yet
  if (typeof window == 'undefined') return <LoadingSpinner />;

  return (
    <div className="flex flex-col w-full items-start justify-between ">
      {/* Title & Date */}
      <TitleAndDate
        title={t('index_title')}
        handleSearch={handleSearchOffers}
      />

      {/* Available Offers */}
      <OffersTable
        offers={offers}
        fetchOffers={fetchOffers}
        isLoading={isLoading}
      />
    </div>
  );
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'sidebar', 'market','dashboardNavbar'])),
      
  },
});

export default OffersPage;

OffersPage.getLayout = (page) => (
  <SidebarLayout title="Marketplace | Cafila" noFooter>
    {page}
  </SidebarLayout>
);
