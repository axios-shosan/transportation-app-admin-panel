import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { Tooltip } from '@mui/material';
const RenderForm = dynamic(
  () => import('@/components/shared-components/RenderForm')
);
import form from '@/data/forms/createBid';
import dynamic from 'next/dynamic';
import { useCreateBidMutation } from '@/redux/api/bidSlice';
import Transition from '../shared-components/ModalsTransitions';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';

type Props = {
  offerId: number;
};

const BidOnOffer = ({ offerId }: Props) => {
  const { t } = useTranslation('errors');
  const [err, setErr] = useState<string | null>(null);
  const [createBid, { isLoading }] = useCreateBidMutation();

  const formik = useFormik({
    initialValues: {
      deliver_at: null,
      amount: null,
      note: '',
    },

    validationSchema: Yup.object({
      note: Yup.string(),
      // amount is a number and required and must be greater than 0
      amount: Yup.number()
        .required(t('amount_required'))
        .min(1, t('amount_invalid'))
        .typeError(t('amount_invalid')),
      deliver_at: Yup.date()
        .min(new Date(), t('deliver_at_min'))
        .required(t('deliver_at_required'))
        .typeError(t('deliver_at_required')),
    }),

    onSubmit: async (values) => {
      createBid({
        offerId: Number(offerId),
        note: values.note,
        amount: Number(values.amount),
        deliver_at: values.deliver_at,
      })
        .unwrap()
        .then((res) => {
          // refresh the table
          formik.resetForm({
            values: {
              deliver_at: new Date(),
              amount: 0,
              note: '',
            },
          });
          toast.success('Offre ajoutée avec succès');
        })
        .catch((err) => {
          console.error('Creating Bid Error: ', err);
          toast.error(err?.data || 'Une erreur est survenue');
          setErr(err.message);
        });
    },
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Enchirer">
        <button
          className="px-4 py-2 bg-primary text-black  rounded-md"
          onClick={handleClickOpen}
        >
          Déposer une offre
        </button>
      </Tooltip>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        // make a dark background with rounded corners
        PaperProps={{
          style: {
            backgroundColor: '#1F1F1F',
            borderRadius: '10px',
            width: '800px',
          },
        }}
      >
        <div className="w-full mx-auto py-16 min-h-[85vh] flex flex-col gap-5 items-center justify-evenly z-10  px-4 bg-light-dark-2 rounded-lg shadow-[0px_0px_5px_2px_rgba(0,0,0,0.25)]   ">
          {/* Title */}
          <h1 className="text-4xl w-full text-center text-primary opacity-80">
            Enchirer
          </h1>

          {/* Error */}
          {err && (
            <div className="w-full flex justify-center">
              <p className="text-red-500">{err}</p>
            </div>
          )}

          {isLoading ? (
            <div className="w-full flex justify-center">
              <p className="text-white">Chargement...</p>
            </div>
          ) : (
            <RenderForm
              translationFile="bids"
              form={form}
              formik={formik}
              setOpen={setOpen}
              initialValues={formik.values}
            />
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default BidOnOffer;
