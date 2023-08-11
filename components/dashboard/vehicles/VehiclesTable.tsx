import { GridColDef } from '@mui/x-data-grid';
import Table from '../Table';
import DeleteVehicleModal from './DeleteModal';
import { Vehicle } from '@/interfaces/vehicle';
import { sharedColumnSettings } from '@/data/table/columns';
import { useTranslation } from 'next-i18next';

type Props = {
  vehicles: Vehicle[];
  fetchVehicles: () => void;
  isLoading: boolean;
};

export default function VehiclesTable({
  vehicles,
  fetchVehicles,
  isLoading,
}: Props) {
  const { t } = useTranslation('vehicles');

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: t('id'),
      ...sharedColumnSettings,
    },
    {
      field: 'name',
      headerName: t('name'),
      ...sharedColumnSettings,
    },
    {
      field: 'model',
      headerName: t('model'),
      ...sharedColumnSettings,
    },
    {
      field: 'type',
      headerName: t('type'),
      ...sharedColumnSettings,
    },
    {
      field: 'year',
      headerName: t('year'),
      ...sharedColumnSettings,
    },
    {
      field: 'plaque',
      headerName: t('plaque'),
      ...sharedColumnSettings,
    },
    {
      field: 'color',
      headerName: t('color'),
      ...sharedColumnSettings,
    },
  ];
  return (
    <div className="w-full bg-light-dark-2 p-3 rounded-lg !shadow-md">
      <Table
        title={t('table_title')}
        isLoading={isLoading}
        actions
        rows={vehicles}
        columns={columns}
        addRecordUrl="/dashboard/vehicles/add-vehicle"
        updateRecordUrl="/dashboard/vehicles"
        DeleteModal={DeleteVehicleModal}
        refresh={fetchVehicles}
      />
    </div>
  );
}
