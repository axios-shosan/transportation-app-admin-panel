import { GridColDef } from '@mui/x-data-grid';
import Table from '@/components/dashboard/Table';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useGetOfferBidsMutation } from '@/redux/api/offerSlice';
import { sharedColumnSettings } from '@/data/table/columns';
import { parseDate } from '@/utils/utils';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export default function BidsTable() {
  const { t } = useTranslation(['bids', 'common']);
  const columns: GridColDef[] = [
    {
      field: 'amount',
      headerName: t('amount'),
      ...sharedColumnSettings,
    },
    {
      field: 'deliver_at',
      headerName: t('deliver_at'),
      ...sharedColumnSettings,
    },
    {
      field: 'n',
      headerName: t('details', { ns: 'common' }),
      ...sharedColumnSettings,
      renderCell: (params) => {
        return (
          <Link
            className="px-4 py-2 bg-primary text-black rounded-md "
            href={`/dashboard/offers/${offerId}/bids/${params.row.id}`}
          >
            {t('consulter', { ns: 'common' })}
          </Link>
        );
      },
    },
  ];

  const router = useRouter();
  const { offerId } = router.query;
  const [bids, setBids] = useState([]);
  const [getAllBids, { isLoading }] = useGetOfferBidsMutation();

  const fetch = () => {
    getAllBids(Number(offerId))
      .unwrap()
      .then((res) => {
        setBids(
          res.map((bid) => {
            return {
              ...bid,
              deliver_at: parseDate(bid.deliver_at),
            };
          })
        );
      })
      .catch((err) => {
        toast.error(err.data);
        console.error(err);
      });
  };

  useEffect(() => {
    fetch();
  }, [getAllBids]);

  return (
    <div className="w-full bg-light-dark-2 p-3 rounded-lg mx-4 !shadow-md">
      <Table
        title={t('bids_table_title')}
        rows={bids}
        columns={columns}
        refresh={fetch}
        isLoading={isLoading}
      />
    </div>
  );
}
