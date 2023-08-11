import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteVehicleMutation } from '@/redux/api/vehicleSlice';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  id: number;
  refresh: () => void;
};

export default function DeleteVehicleModal({ id, refresh }: Props) {
  const [deleteVehicle, { isLoading }] = useDeleteVehicleMutation();
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation(['vehicles', 'common']);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteVehicle(id)
      .unwrap()
      .then(() => {
        setOpen(false);
        // refresh the table
        refresh();
        toast.success('Véhicule supprimé');
      })
      .catch((err) => {
        toast.error('Erreur lors de la suppression du véhicule');
        setOpen(false);
      });
  };

  return (
    <div>
      <Tooltip title={t('common:delete')}>
        <button onClick={handleClickOpen}>
          <DeleteIcon className="text-red-500 !text-[22px] mr-3" />
        </button>
      </Tooltip>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDelete}
        // make a dark background with rounded corners
        PaperProps={{
          style: {
            backgroundColor: '#1F1F1F',
            borderRadius: '10px',
            width: '300px',
          },
        }}
      >
        <DialogContent>
          <DialogContentText className="!text-white">
            {t('delete_vehicle_text')}
          </DialogContentText>
        </DialogContent>
        {!isLoading ? (
          <DialogActions>
            <Button
              onClick={handleDelete}
              className="!text-white hover:!bg-primary hover:!bg-opacity-20"
            >
              {t('yes')}
            </Button>
            <Button
              onClick={handleClose}
              className="!text-white hover:!bg-red-500 hover:!bg-opacity-20"
            >
              {t('no')}
            </Button>
          </DialogActions>
        ) : (
          <div className="w-full flex justify-center">
            <p className="text-white">Chargement...</p>
          </div>
        )}
      </Dialog>
    </div>
  );
}
