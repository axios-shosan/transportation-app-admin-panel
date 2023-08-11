import { GridColDef } from '@mui/x-data-grid';
import Table from '../Table';
import Link from 'next/link';
import { Offer } from '@/interfaces/offer';
import { sharedColumnSettings } from '@/data/table/columns';
import { parseDate } from '@/utils/utils';
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
      deliver_at: new Date(offer.deliver_at).toUTCString(),
      status: parseStatus(offer.status),
    };
  });
}

type Props = {
  offers: Offer[];
  fetchOffers: () => void;
  isLoading: boolean;
};

export default function OffersTable({ offers, fetchOffers, isLoading }: Props) {
  const { t } = useTranslation(['market', 'common']);
  const columns: GridColDef[] = [
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
      renderCell: (params) => {
        return parseDate(params.row.deliver_at);
      },
      type: 'date',
      ...sharedColumnSettings,
    },
    {
      field: '',
      headerName: t('details', { ns: 'common' }),
      ...sharedColumnSettings,
      renderCell: (params) => (
        <Link
          href={`marketplace/${params.row.id}`}
          className="px-4 py-2 bg-primary text-black rounded-md "
        >
          {t('consulter', { ns: 'common' })}
        </Link>
      ),
    },
  ];

  return (
    <div className="w-full bg-light-dark-2 p-3 rounded-lg !shadow-md">
      <Table
        title={t('marketplace_table_title')}
        rows={offers}
        columns={columns}
        refresh={fetchOffers}
        isLoading={isLoading}
      />
    </div>
  );
}
