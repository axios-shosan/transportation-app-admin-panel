import { DataGrid, GridValueGetterParams } from '@mui/x-data-grid';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import LoadingSpinner from '../shared-components/LoadingSpinner';
import { Tooltip } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

type Props = {
  rows: any;
  columns: any;
  addRecordUrl?: string;
  updateRecordUrl?: string;
  deleteRecord?: (id: number) => void;
  updateRecord?: (id: number) => void;
  DeleteModal?: JSX.Element | any;
  UpdateModal?: JSX.Element | any;
  actions?: boolean;
  refresh?: () => void;
  isLoading: boolean;
  title: string;
};

const Table = ({
  rows = [],
  columns = [],
  addRecordUrl = '',
  updateRecordUrl = '',
  actions = false,
  DeleteModal,
  isLoading,
  title,
  refresh,
}: Props) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <div className="w-full flex-1 h-[490px] ">
      <DataGrid
        autoPageSize
        rows={rows}
        columns={
          actions
            ? columns.concat({
                field: 'actions',
                headerName: 'Actions',
                headerAlign: 'center',
                align: 'center',
                sortable: false,
                disableColumnMenu: true,
                renderCell: (params: GridValueGetterParams) => {
                  return (
                    // two button with bin and pen icons
                    <div className="flex items-center justify-center">
                      <DeleteModal id={params.row.id} refresh={refresh} />
                      <Tooltip title={t('modify')}>
                        <Link href={updateRecordUrl + `/${params.row.id}`}>
                          <button
                            onClick={() =>
                              router.push(updateRecordUrl + `/${params.row.id}`)
                            }
                          >
                            <BorderColorIcon className="text-white !text-[22px] mr-3" />
                          </button>
                        </Link>
                      </Tooltip>
                    </div>
                  );
                },
              })
            : columns
        }
        className="bg-light-dark-2 !rounded-lg p-1 !text-white sm:p-2"
        pageSize={7}
        rowsPerPageOptions={[7]}
        style={{
          fontFamily: 'Kanit',
          border: 0,
        }}
        sx={{
          '& .MuiDataGrid-row': {
            border: 0,
          },
          '& .MuiDataGrid-cell': {
            border: 0,
          },
          '& .MuiDataGrid-columnHeader': {
            border: 0,
            backgroundColor: '#414141',
            width: '100%',
            color: '#7A7A7A',
          },
          '& .MuiDataGrid-root': {
            borderRadius: '100px',
          },
          // remove column separator
          '& .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          // pagination color
          '& .MuiTablePagination-root': {
            color: '#FFFFFF !important',
          },
          // pagination button color
          '& .MuiIconButton-root': {
            color: '#FFFFFF !important',
          },
        }}
        components={{
          NoRowsOverlay: () => (
            <div className="flex items-center justify-center h-full">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <h3 className="text-base font-medium sm:text-xl">
                  {t('no_record')}
                </h3>
              )}
            </div>
          ),
          Toolbar: () => (
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-medium">{title}</h3>
              {addRecordUrl ? (
                <Link
                  href={addRecordUrl || '/dashboard/vehicles/add-vehicle'}
                  className="bg-primary px-4 py-2 rounded-md w-12 text-dark font-[500] flex items-center justify-evenly md:w-32"
                >
                  <AddOutlinedIcon className="text-3xl text-dark " />
                  <p className="hidden md:block">{t('add')}</p>
                </Link>
              ) : (
                <div />
              )}
            </div>
          ),
        }}
      />
    </div>
  );
};

export default Table;
