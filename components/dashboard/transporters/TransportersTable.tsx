import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Table from '../Table';
import DeleteModal from './DeleteModal';
import { Transporter } from '@/interfaces/transporter';
import { sharedColumnSettings } from '@/data/table/columns';
import { useTranslation } from 'next-i18next';

type Props = {
  tranporters: Transporter[];
  fetchTransporters: () => void;
  isLoading: boolean;
};

export default function TranportersTable({
  tranporters,
  fetchTransporters,
  isLoading,
}: Props) {
  const { t } = useTranslation('transporters');

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: t('name'),
      ...sharedColumnSettings,
    },
    {
      field: 'email',
      headerName: t('email'),
      ...sharedColumnSettings,
    },
    {
      field: 'phone_number',
      headerName: t('phone_number'),
      ...sharedColumnSettings,
    },
  ];
  return (
    <div className="w-full bg-light-dark-2 p-3 rounded-lg !shadow-md">
      <Table
        title={t('table_title')}
        isLoading={isLoading}
        actions
        rows={tranporters}
        columns={columns}
        addRecordUrl="transporters/add-transporter"
        updateRecordUrl="/dashboard/transporters"
        DeleteModal={DeleteModal}
        refresh={fetchTransporters}
      />
    </div>
  );
}
