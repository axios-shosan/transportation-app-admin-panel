import { useFormik } from 'formik';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
const OutlinedInput = dynamic(() => import('@mui/material/OutlinedInput'));
import { Offer } from '@/interfaces/offer';
import { useCreateOfferMutation } from '@/redux/api/offerSlice';
import Title from '../shared-components/Title';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';

const AddVehicleForm = () => {
  const router = useRouter();
  const { t } = useTranslation('errors');
  const [createOffer, { isLoading }] = useCreateOfferMutation();

  const formik = useFormik({
    initialValues: {
      from: '',
      to: '',
      deliver_at: new Date(),
      shipment_type: 0,
      weight: 0,
      fragile: 0,
      enabled: 0,
      note: '',
    },

    validationSchema: Yup.object().shape({
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

    onSubmit: async (offer: Offer) => {
      // use next-auth to login
      const { signIn } = await import('next-auth/react');

      createOffer({
        from: offer.from,
        to: offer.to,
        deliver_at: offer.deliver_at,
        shipment_type: offer.shipment_type,
        weight: offer.weight,
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
              shipment_type: 0,
              weight: 0,
              fragile: 0,
              enabled: 0,
              note: '',
            },
          });
          toast.success('Offre ajoutée avec succès');
        })
        .catch((err) => {
          formik.setErrors({
            from: 'Required',
            to: 'Required',
            deliver_at: 'Required',
            shipment_type: 'Reqruied',
            weight: 'Required',
            fragile: 'Required',
            enabled: 'Required',
          });
          toast.error('Une erreur est survenue');
          //router.push("/login");
        });
    },
  });

  return (
    <div className="w-[95%] mx-auto h-auto  py-16 min-h-[85vh] flex flex-col gap-5 items-center justify-evenly z-10  px-4 bg-light-dark-2 rounded-lg shadow-[0px_0px_5px_2px_rgba(0,0,0,0.25)]   lg:w-3/5">
      {/* Title */}
      <Title title="Ajouter Une Demande" />

      <form
        className="w-[70%] mx-auto flex-col gap-10 items-center justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          //router.push("/register/account-type");
        }}
      >
        {/* name */}
        <OutlinedInput
          type="text"
          name="from"
          placeholder="Départ"
          className="bg-light-dark-3 my-3 border-none outline-none w-full px-4 rounded-md  text-white text-sm text-left flex-1 h-20 lg:text-md"
          sx={{
            width: '100%',
            textAlign: 'left',
            height: '100%',
            '& fieldset': {
              border: 'none',
            },
          }}
          inputProps={{ style: { textAlign: 'left', color: 'white' } }}
        />

        {/* Color */}
        <OutlinedInput
          type="text"
          name="to"
          placeholder="Arrivé"
          className="bg-light-dark-3 my-3 border-none outline-none w-full px-4 rounded-md  text-white text-sm text-left flex-1 h-20 lg:text-md"
          sx={{
            width: '100%',
            textAlign: 'left',
            height: '100%',
            '& fieldset': {
              border: 'none',
            },
          }}
          inputProps={{ style: { textAlign: 'left', color: 'white' } }}
        />

        {/* Model */}
        <OutlinedInput
          type="date"
          name="deliver_at"
          className="bg-light-dark-3 my-3 border-none outline-none w-full px-4 rounded-md  text-white text-sm text-left flex-1 h-20 lg:text-md"
          sx={{
            width: '100%',
            textAlign: 'left',
            height: '100%',
            '& fieldset': {
              border: 'none',
            },
          }}
          inputProps={{ style: { textAlign: 'left', color: 'white' } }}
        />

        {/* type */}
        <OutlinedInput
          type="number"
          name="shipment_type"
          placeholder="Type"
          className="bg-light-dark-3 my-3 border-none outline-none w-full px-4 rounded-md  text-white text-sm text-left flex-1 h-20 lg:text-md"
          sx={{
            width: '100%',
            textAlign: 'left',
            height: '100%',
            '& fieldset': {
              border: 'none',
            },
          }}
          inputProps={{ style: { textAlign: 'left', color: 'white' } }}
        />

        {/* year */}
        <OutlinedInput
          type="number"
          name="weight"
          placeholder="Poids"
          className="bg-light-dark-3 my-3 border-none outline-none w-full px-4 rounded-md  text-white text-sm text-left flex-1 h-20 lg:text-md"
          sx={{
            width: '100%',
            textAlign: 'left',
            height: '100%',
            '& fieldset': {
              border: 'none',
            },
          }}
          inputProps={{ style: { textAlign: 'left', color: 'white' } }}
        />

        {/* Plaque */}
        <OutlinedInput
          type="text"
          name="fragile"
          placeholder="Fragile"
          className="bg-light-dark-3 my-3 border-none outline-none w-full px-4 rounded-md  text-white text-sm text-left flex-1 h-20 lg:text-md"
          sx={{
            width: '100%',
            textAlign: 'left',
            height: '100%',
            '& fieldset': {
              border: 'none',
            },
          }}
          inputProps={{ style: { textAlign: 'left', color: 'white' } }}
        />

        <OutlinedInput
          type="number"
          placeholder="Couverte"
          className="bg-light-dark-3 my-3 border-none outline-none w-full px-4 rounded-md  text-white text-sm text-left flex-1 h-20 lg:text-md"
          sx={{
            width: '100%',
            textAlign: 'left',
            height: '100%',
            '& fieldset': {
              border: 'none',
            },
          }}
          inputProps={{ style: { textAlign: 'left', color: 'white' } }}
        />
        <OutlinedInput
          type="number"
          name="enabled"
          placeholder="Active"
          className="bg-light-dark-3 my-3 border-none outline-none w-full px-4 rounded-md  text-white text-sm text-left flex-1 h-20 lg:text-md"
          sx={{
            width: '100%',
            textAlign: 'left',
            height: '100%',
            '& fieldset': {
              border: 'none',
            },
          }}
          inputProps={{ style: { textAlign: 'left', color: 'white' } }}
        />

        <OutlinedInput
          type="text"
          name="note"
          placeholder="Note"
          className="bg-light-dark-3 my-3 border-none outline-none w-full px-4 rounded-md  text-white text-sm text-left flex-1 h-20 lg:text-md"
          sx={{
            width: '100%',
            textAlign: 'left',
            height: '100%',
            '& fieldset': {
              border: 'none',
            },
          }}
          inputProps={{ style: { textAlign: 'left', color: 'white' } }}
        />

        <div className="w-full flex items-center justify-between">
          {/* Annuler */}
          <button
            type="submit"
            className="capitalize text-lg text-center w-1/2  mr-2 h-12 mt-8 bg-light-dark-3 text-white rounded-md py-3 font-medium  shadow-lg lg:h-14"
            onClick={() => {
              router.back();
            }}
          >
            Annuler
          </button>

          {/* Sauvegarder */}
          <button
            type="submit"
            className="capitalize text-lg text-center w-1/2  ml-2 h-12 mt-8 bg-primary text-dark rounded-md py-3 font-medium hover:bg-primary hover:bg-opacity-90 shadow-lg lg:h-14"
          >
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicleForm;
