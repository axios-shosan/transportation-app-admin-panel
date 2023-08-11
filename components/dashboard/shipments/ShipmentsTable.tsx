import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Table from '../Table';
import { Shipment } from '@/interfaces/shipment';
import { sharedColumnSettings } from '@/data/table/columns';
import { parseDate } from '@/utils/utils';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

type Props = {
  shipments: Shipment[];
  isLoading: boolean;
};

export default function ShipmentsTable({ shipments, isLoading }: Props) {
  const { t } = useTranslation(['shipments', 'common']);
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: t('id'),
      ...sharedColumnSettings,
    },
    {
      field: 'deliver_at',
      headerName: t('deliver_at'),
      renderCell: (params) => {
        return parseDate(params.row.deliver_at);
      },
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
      field: 'offer_id',
      headerName: t('offer_id'),
      ...sharedColumnSettings,
    },

    {
      field: 'status',
      headerName: t('status'),
      ...sharedColumnSettings,
      renderCell: (params: GridValueGetterParams) => {
        return (
          <div className="h-8 flex items-center">
            <span
              className={`flex items-center justify-center text-white text-sm  w-20 h-full rounded-md
                    ${
                      params.value === 0
                        ? 'text-yellow-500'
                        : params.value === 1
                        ? 'text-green-500'
                        : params.value === 2
                        ? 'text-red-500'
                        : 'text-white'
                    }
                   `}
            >
              {params.value === 0
                ? t('status_values.0')
                : params.value === 1
                ? t('status_values.1')
                : params.value === 2
                ? t('status_values.2')
                : t('status_values.3')}
            </span>
          </div>
        );
      },
    },

    {
      field: '',
      headerName: t('details', { ns: 'common' }),
      ...sharedColumnSettings,
      renderCell: (params) => {
        return (
          <Link
            className="px-4 py-2 bg-primary text-black rounded-md "
            href={`/dashboard/shipments/${params.row.id}`}
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
        rows={shipments}
        columns={columns}
        isLoading={isLoading}
        title={t('table_title')}
      />
    </div>
  );
}
