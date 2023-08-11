import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import RenderForm from '@/components/shared-components/RenderForm';
import form from '@/data/forms/createOffer';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useCreateOfferMutation } from '@/redux/api/offerSlice';
import Title from '../shared-components/Title';
import { useTranslation } from 'next-i18next';

const AddOfferForm = () => {
  const [err, setErr] = useState<string | null>(null);
  const [createOffer, { isLoading }] = useCreateOfferMutation();
  const router = useRouter();
  const { t } = useTranslation('offers');

  const formik = useFormik({
    initialValues: {
      from: null,
      to: null,
      deliver_at: null,
      shipment_type: null,
      weight: null,
      fragile: null,
      enabled: null,
      note: null,
    },

    validationSchema: Yup.object({
      from: Yup.string().required('Départ requis').typeError('Départ requis'),
      to: Yup.string().required(t('to_required')).typeError(t('to_invalid')),
      deliver_at: Yup.date()
        .min(new Date(), t('deliver_at_min'))
        .typeError(t('deliver_at_required')),
      shipment_type: Yup.number()
        .required(t('shipment_type_required'))
        .typeError(t('shipment_type_invalid')),
      weight: Yup.number()
        .required(t('weight_required'))
        .typeError(t('weight_invalid')),
      fragile: Yup.number()
        .required(t('fragile_required'))
        .required(t('fragile_required')),
      note: Yup.string(),
    }),

    onSubmit: async (offer) => {
      createOffer({
        from: offer.from,
        to: offer.to,
        deliver_at: offer.deliver_at,
        shipment_type: offer.shipment_type,
        weight: Number(offer.weight),
        fragile: offer.fragile,
        enabled: offer.enabled,
        note: offer.note,
      })
        .unwrap()
        .then((res) => {
          formik.resetForm({
            values: {
              from: '',
              to: '',
              deliver_at: new Date(),
              shipment_type: null,
              weight: null,
              fragile: null,
              enabled: null,
              note: '',
            },
          });
          toast.success('Offre a été crée');
          router.back();
        })
        .catch((err) => {
          toast.error("La creation de l'offre a échoé ");
          setErr(err.message);
        });
    },
  });

  return (
    <div className="w-[95%] mx-auto h-auto  py-16 min-h-[85vh] flex flex-col gap-5 items-center justify-evenly z-10  px-4 bg-light-dark-2 rounded-lg shadow-[0px_0px_5px_2px_rgba(0,0,0,0.25)]   lg:w-3/5">
      {/* Title */}
      <Title title={t('create_offer_form_title')} />

      {/* Error */}
      {err && (
        <div className="w-full flex justify-center">
          <p className="text-red-500">{err}</p>
        </div>
      )}

      <RenderForm translationFile="offers" form={form} formik={formik} />
    </div>
  );
};

export default AddOfferForm;
