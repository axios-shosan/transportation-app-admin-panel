import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useUpdateVehicleMutation } from '@/redux/api/vehicleSlice';
import { useState } from 'react';
import * as React from 'react';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
const RenderForm = dynamic(
  () => import('@/components/shared-components/RenderForm')
);
import form from '@/data/forms/updateVehicle';
import dynamic from 'next/dynamic';
import { Vehicle } from '@/interfaces/vehicle';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Title from '../shared-components/Title';
import { useTranslation } from 'next-i18next';

type Props = {
  record: Vehicle;
};

const UpdateVehicleModal = ({ record }: Props) => {
  const [err, setErr] = useState<string | null>(null);
  const [updateVehicle, { isLoading }] = useUpdateVehicleMutation();
  const router = useRouter();
  const { t } = useTranslation(['vehicles', 'common']);

  const formik = useFormik({
    initialValues: {
      name: record.name || '',
      model: record.model || '',
      color: record.color || '',
      type: record.type || 0,
      year: record.year || 0,
      plaque: record.plaque || '',
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required(t('name_required'))
        .typeError(t('name_invalid')),
      model: Yup.string()
        .required(t('model_required'))
        .typeError(t('model_invalid')),
      color: Yup.string()
        .required(t('color_required'))
        .typeError(t('color_invalid')),
      type: Yup.number()
        .required(t('type_required'))
        .typeError(t('type_invalid')),
      year: Yup.number()
        .required(t('year_required'))
        .typeError(t('year_invalid')),
      plaque: Yup.string()
        .required(t('plaque_required'))
        .typeError(t('plaque_invalid')),
    }),

    onSubmit: async (values) => {
      updateVehicle({
        vehicle_id: record.id,
        name: values.name,
        model: values.model,
        type: values.type,
        year: Number(values.year),
        plaque: values.plaque,
        color: values.color,
      })
        .unwrap()
        .then((res) => {
          toast.success('La Vehicule a été mis a jour');
          router.push('/dashboard/vehicles');
        })
        .catch((err) => {
          toast.error('Le Mise A Jour De la Vehicule a échoué');
          setErr(err.message);
        });
    },
  });

  return (
    <div>
      <div className="w-[95%] mx-auto h-auto  py-16 min-h-[85vh] flex flex-col gap-5 items-center justify-evenly z-10  px-4 bg-light-dark-2 rounded-lg shadow-[0px_0px_5px_2px_rgba(0,0,0,0.25)] lg:w-3/5 ">
        {/* Title */}
        <Title title={t('modify_vehicle_form_title')} />

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
            translationFile="vehicles"
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
