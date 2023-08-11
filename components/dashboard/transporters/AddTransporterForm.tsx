import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import RenderForm from '@/components/shared-components/RenderForm';
import form from '@/data/forms/createTranporter';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useCreateTransporterMutation } from '@/redux/api/transporterSlice';
import Title from '../shared-components/Title';
import { useTranslation } from 'next-i18next';

const AddVehicleForm = () => {
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();
  const [createTranporter] = useCreateTransporterMutation();
  const { t } = useTranslation('transporters');

  const formik = useFormik({
    initialValues: {
      name: null,
      email: null,
      phone_number: null,
      password: null,
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required(t('name_required'))
        .typeError(t('name_invalid')),
      email: Yup.string()
        .email()
        .required(t('email_required'))
        .typeError(t('email_invalid')),
      phone_number: Yup.string()
        .matches(/^0[5|6|7]\d{8}$/, t('phone_number_invalid'))
        .required(t('phone_number_required'))
        .typeError(t('phone_number_invalid')),
      password: Yup.string()
        .required(t('name_required'))
        .typeError(t('name_required')),
    }),

    onSubmit: async (values) => {
      createTranporter({
        name: values.name,
        email: values.email,
        phone_number: values.phone_number,
        password: values.password,
      })
        .unwrap()
        .then((res) => {
          formik.resetForm({
            values: {
              name: null,
              email: null,
              phone_number: null,
              password: null,
            },
          });
          toast.success('Transporteur a été ajouté');
          router.back();
        })
        .catch((err) => {
          toast.error('La creation de trasnporteur a échoé ');
          setErr(err.message);
        });
    },
  });

  return (
    <div className="w-[95%] mx-auto h-auto  py-16 min-h-[85vh] flex flex-col gap-5 items-center justify-evenly z-10  px-4 bg-light-dark-2 rounded-lg shadow-[0px_0px_5px_2px_rgba(0,0,0,0.25)]  lg:w-3/5">
      {/* Title */}
      <Title title={t('create_transporter_form')} />

      {/* Error */}
      {err && (
        <div className="w-full flex justify-center">
          <p className="text-red-500">{err}</p>
        </div>
      )}

      <RenderForm translationFile="transporters" form={form} formik={formik} />
    </div>
  );
};

export default AddVehicleForm;
