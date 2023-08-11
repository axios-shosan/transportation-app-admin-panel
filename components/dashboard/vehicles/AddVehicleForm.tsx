import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCreateVehicleMutation } from '@/redux/api/vehicleSlice';
import { useState } from 'react';
import RenderForm from '@/components/shared-components/RenderForm';
import form from '@/data/forms/createVehicle';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Title from '../shared-components/Title';
import { useTranslation } from 'next-i18next';

const AddVehicleForm = () => {
  const { t } = useTranslation('vehicles');
  const [err, setErr] = useState<string | null>(null);
  const [createVehicle, { isLoading }] = useCreateVehicleMutation();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: null,
      model: null,
      color: null,
      type: null,
      year: null,
      plaque: null,
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required('Nom du véhicule requis')
        .typeError('Nom du véhicule requis'),
      model: Yup.string()
        .required('Modèle du véhicule requis')
        .typeError('Modèle du véhicule requis'),
      color: Yup.string()
        .required('Couleur du véhicule requis')
        .typeError('Couleur du véhicule requis'),
      type: Yup.number()
        .required('Type de véhicule requis')
        .typeError('Type de véhicule requis'),
      year: Yup.number()
        .required('Année du véhicule requis')
        .typeError('Année du véhicule requis'),
      plaque: Yup.string()
        .required('Plaque du véhicule requis')
        .typeError('Plaque du véhicule requis'),
    }),

    onSubmit: async (values) => {
      createVehicle({
        name: values.name,
        model: values.model,
        type: Number(values.type),
        year: Number(values.year),
        plaque: values.plaque,
        color: values.color,
      })
        .unwrap()
        .then((res) => {
          formik.resetForm({
            values: {
              name: '',
              model: '',
              color: '',
              type: null,
              year: null,
              plaque: '',
            },
          });
          toast.success('Véhicule a été crée');
          router.back();
        })
        .catch((err) => {
          toast.error('La creation de la vehicule a échoé ');
          setErr(err.message);
        });
    },
  });

  return (
    <div className="w-full mx-auto h-auto  py-16 min-h-[85vh] flex flex-col gap-5 items-center justify-evenly z-10  px-4 bg-light-dark-2 rounded-lg shadow-[0px_0px_5px_2px_rgba(0,0,0,0.25)]  lg:w-3/5">
      {/* Title */}
      <Title title={t('create_vehicle_form_title')} />

      {/* Error */}
      {err && (
        <div className="w-full flex justify-center">
          <p className="text-red-500">{err}</p>
        </div>
      )}

      <RenderForm translationFile="vehicles" form={form} formik={formik} />
    </div>
  );
};

export default AddVehicleForm;
