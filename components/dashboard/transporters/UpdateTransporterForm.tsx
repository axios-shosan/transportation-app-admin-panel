import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import * as React from 'react';
const RenderForm = dynamic(
  () => import('@/components/shared-components/RenderForm')
);
import form from '@/data/forms/updateTransporter';
import dynamic from 'next/dynamic';
import { Transporter } from '@/interfaces/transporter';
import { useUpdateTransporterMutation } from '@/redux/api/transporterSlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import LoadingSpinner from '@/components/shared-components/LoadingSpinner';
import Title from '../shared-components/Title';
import { useTranslation } from 'next-i18next';

type Props = {
  record: Transporter;
};

const UpdateVehicleModal = ({ record }: Props) => {
  const [err, setErr] = useState<string | null>(null);
  const [updateTransporter, { isLoading }] = useUpdateTransporterMutation();
  const router = useRouter();
  const { t } = useTranslation(['transporters', 'errors']);

  const formik = useFormik({
    initialValues: {
      name: record?.name || '',
      email: record?.email || '',
      phone_number: record?.phone_number || '',
      password: record?.password || '',
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
    }),

    onSubmit: async (values) => {
      updateTransporter({
        transporter_id: Number(record.id),
        name: values.name,
        email: values.email,
        phone_number: values.phone_number,
        password: values.password,
      })
        .unwrap()
        .then((res) => {
          toast.success('Le transporteur a été mis a jour');
          router.push('/dashboard/transporters');
        })
        .catch((err) => {
          toast.error('La mise a jour de transporteur a échoé');
          setErr(err.message);
        });
    },
  });

  return (
    <div>
      <div className="w-[95%] mx-auto h-auto  py-16 min-h-[85vh] flex flex-col gap-5 items-center justify-evenly z-10  px-4 bg-light-dark-2 rounded-lg shadow-[0px_0px_5px_2px_rgba(0,0,0,0.25)] lg:w-3/5 ">
        {/* Title */}
        <Title title={t('modify_transporter_form')} />

        {/* Error */}
        {err && (
          <div className="w-full flex justify-center">
            <p className="text-red-500">{err}</p>
          </div>
        )}

        {isLoading ? (
          <div className="w-full flex justify-center">
            <p className="text-white">
              <LoadingSpinner />
            </p>
          </div>
        ) : (
          <RenderForm
            translationFile="transporters"
            form={form}
            formik={formik}
            initialValues={record}
          />
        )}
      </div>
    </div>
  );
};

export default UpdateVehicleModal;
