import { GridColDef } from '@mui/x-data-grid';
import Table from '../Table';
import { useRouter } from 'next/router';
import { parseDate } from '@/utils/utils';
import { Offer } from '@/interfaces/offer';
import { sharedColumnSettings } from '@/data/table/columns';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

function parseStatus(status: number) {
  switch (status) {
    case 0:
      return 'offre en cour';
      break;
    case 1:
      return 'offre disponible';
      break;
    case 2:
      return 'offre fait';
      break;
    case 3:
      return 'offre archivé';
      break;

    default:
      break;
  }
}

function parseOffers(offers: any[]) {
  return offers.map((offer) => {
    return {
      ...offer,
      deliver_at: parseDate(offer.deliver_at),
    };
  });
}

type Props = {
  offers: Offer[];
  fetchOffers: () => void;
  isLoading: boolean;
};

export default function OffersTable({ offers, fetchOffers, isLoading }: Props) {
  const { t } = useTranslation(['offers', 'common']);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: t('id'),
      ...sharedColumnSettings,
    },
    {
      field: 'from',
      headerName: t('from'),
      ...sharedColumnSettings,
    },
    {
      field: 'to',
      headerName: t('to'),
      ...sharedColumnSettings,
    },
    {
      field: 'deliver_at',
      headerName: t('deliver_at'),
      ...sharedColumnSettings,
      type: 'date',
    },
    {
      sortable: false,
      disableColumnMenu: true,
      field: t('bids'),
      ...sharedColumnSettings,
      renderCell: (params) => {
        return (
          <Link
            className="px-2 py-2 bg-primary text-xs text-black rounded-md sm:px-3 md:text-base"
            href={`offers/${params.row.id}/bids`}
          >
            {t('consulter', { ns: 'common' })}
          </Link>
        );
      },
    },
  ];

  return (
    <div className="w-full bg-light-dark-2 p-3 rounded-lg !shadow-md">
      <Table
        title={t('table_title')}
        rows={parseOffers(offers)}
        columns={columns}
        refresh={fetchOffers}
        isLoading={isLoading}
        addRecordUrl="offers/add-offer"
      />
    </div>
  );
}
