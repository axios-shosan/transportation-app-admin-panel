import { useFormik } from 'formik';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
const OutlinedInput = dynamic(() => import('@mui/material/OutlinedInput'));
import { useCreateBidMutation } from '@/redux/api/bidSlice';
import { Bid } from '@/interfaces/bid';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';

type Props = {
  offerId: number;
};

const AddBidForm = ({ offerId }: Props) => {
  const router = useRouter();
  const { t } = useTranslation('errors');
  const [createBid, { isLoading }] = useCreateBidMutation();

  const formik = useFormik({
    initialValues: {
      deliver_at: new Date(),
      amount: 0,
      note: '',
      status: 0,
    },

    validationSchema: Yup.object().shape({
      note: Yup.string(),
      amount: Yup.number().required(t('amount_required')),
      status: Yup.number().required(t('status_required')),
      deliver_at: Yup.date()
        .min(new Date(), t('deliver_at_min'))
        .required(t('deliver_at_required'))
        .typeError(t('deliver_at_invalid')),
    }),

    onSubmit: async (bid: Bid) => {
      createBid({
        offerId: Number(offerId),
        status: Number(bid.status) || 0,
        note: bid.note,
        amount: Number(bid.amount),
        deliver_at: bid.deliver_at,
      })
        .unwrap()
        .then((res) => {
          formik.resetForm({
            values: {
              deliver_at: new Date(),
              status: 0,
              amount: 0,
              note: '',
            },
          });
          toast.success('Demande ajoutée avec succès');
        })
        .catch((err) => {
          formik.setErrors({
            deliver_at: 'Required',
            amount: 'Required',
            note: 'Required',
          });
          toast.error("Erreur lors de l'ajout de la demande");
          //router.push("/login");
        });
    },
  });

  return (
    <div className="w-[95%] mx-auto h-auto  py-16 min-h-[85vh] flex flex-col gap-5 items-center justify-evenly z-10  px-4 bg-light-dark-2 rounded-lg shadow-[0px_0px_5px_2px_rgba(0,0,0,0.25)]   lg:w-3/5">
      {/* Title */}
      <h1 className="text-4xl w-full text-center font-medium">
        Ajouter Une Demande
      </h1>

      <form
        className="w-[70%] mx-auto flex-col gap-10 items-center justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          //router.push("/register/account-type");
        }}
      >
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
          name="status"
          placeholder="Status"
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
          name="ampunt"
          placeholder="Quantité"
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

export default AddBidForm;
