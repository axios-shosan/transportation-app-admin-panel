import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
const RenderForm = dynamic(
  () => import('@/components/shared-components/RenderForm')
);
import form from '@/data/forms/createBid';
import dynamic from 'next/dynamic';
import { useCreateBidMutation } from '@/redux/api/bidSlice';
import Title from '../shared-components/Title';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';

type Props = {
  offerId: number;
};

const BidOfferForm = ({ offerId }: Props) => {
  const [err, setErr] = useState<string | null>(null);
  const [createBid, { isLoading }] = useCreateBidMutation();
  const { t } = useTranslation(['market', 'common', 'errors']);

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
          toast.success("L'enchaire a été ajouté");
          // refresh the table
          formik.resetForm({
            values: {
              deliver_at: new Date(),
              amount: 0,
              note: '',
            },
          });
        })
        .catch((err) => {
          console.error('Creating Bid Error: ', err);
          toast.error(err.data);
          setErr(err.message);
        });
    },
  });

  return (
    <div className="w-[50%] mx-auto py-16 min-h-[85vh] flex flex-col gap-5 items-center justify-evenly z-10  px-4 bg-light-dark-2 rounded-lg shadow-[0px_0px_5px_2px_rgba(0,0,0,0.25)]   ">
      {/* Title */}
      <Title title={t('create_bid_form')} />

      {/* Error */}
      {err && (
        <div className="w-full flex justify-center">
          <p className="text-red-500">{err}</p>
        </div>
      )}

      {isLoading ? (
        <div className="w-full flex justify-center">
          <p className="text-white">{t('loading')}...</p>
        </div>
      ) : (
        <RenderForm
          translationFile="market"
          form={form}
          formik={formik}
          initialValues={formik.values}
        />
      )}
    </div>
  );
};

export default BidOfferForm;
