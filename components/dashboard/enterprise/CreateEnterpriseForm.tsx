import { useFormik } from 'formik';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import * as Yup from 'yup';
import { Enterprise } from '@/interfaces/enterprise';
import { useCreateEnterpriseMutation } from '@/redux/api/enterpriseSlice';
import InputWithIcon from '@/components/shared-components/data-entries/InputWithIcon';
import DropDown from '@/components/shared-components/data-entries/DropDown';
import { toast } from 'react-toastify';
const Link = dynamic(() => import('next/link'));
import { useTranslation } from 'next-i18next';

export default function CreateEnterpriseForm() {
  const router = useRouter();
  const [createEnterprise, { isLoading }] = useCreateEnterpriseMutation();
  const { t } = useTranslation('enterprise');

  const formik = useFormik({
    initialValues: {
      name: null,
      rc: null,
      nif: null,
      nis: null,
      address: null,
      capital: null,
      type: null,
      employees: null,
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required(t('name_required'))
        .typeError(t('name_required')),
      rc: Yup.string().required(t('rc_required')).typeError(t('rc_invalid')),
      nif: Yup.string().required(t('nif_required')).typeError(t('nif_invalid')),
      nis: Yup.string().required(t('nis_required')).typeError(t('nis_invalid')),
      address: Yup.string()
        .required(t('address_required'))
        .typeError(t('address_required')),
      capital: Yup.number()
        .min(0)
        .required(t('capital_required'))
        .typeError(t('capital_invalid')),
      type: Yup.number()
        .required(t('type_required'))
        .typeError(t('type_invalid')),
      employees: Yup.number()
        .min(0)
        .required(t('employees_required'))
        .typeError(t('employees_invalid')),
    }),

    onSubmit: async (enterprise: Enterprise) => {
      createEnterprise({
        name: enterprise.name,
        rc: enterprise.rc,
        nif: enterprise.nif,
        nis: enterprise.nis,
        address: enterprise.address,
        capital: Number(enterprise.capital),
        type: Number(enterprise.type),
        employees: Number(enterprise.employees),
      })
        .unwrap()
        .then((res) => {
          formik.resetForm({
            values: {
              name: '',
              rc: '',
              nif: '',
              nis: '',
              address: '',
              capital: null,
              type: null,
              employees: null,
            },
          });
          toast.success('Entreprise ajoutée avec succès');
          router.push('/dashboard');
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.data);
        });
    },
  });

  return (
    <div className=" m-auto w-[95%]  flex flex-col items-center justify-evenly z-10  px-4 py-6 bg-light-dark-1 rounded-lg shadow-[0px_0px_5px_2px_rgba(0,0,0,0.25)]  animate-slide-in-left sm:w-3/4 md:w-3/5">
      <h1 className="text-4xl my-10 w-full text-center font-medium">
        Créer Votre Entreprise.
      </h1>

      {/* Form */}
      <form
        className="w-[70%] mx-auto flex-col items-center justify-center"
        onSubmit={formik.handleSubmit}
      >
        <div className="w-full flex flex-col lg:flex-row justify-between items-center">
          {/* Name */}
          <InputWithIcon
            type="text"
            name="name"
            value={formik.values['name']}
            placeholder={t('form.placeholders.name')}
            className="m-0 mb-5 w-full lg:w-[45%] md:mb-8"
            inputClasses="font-medium bg-light-dark-3 h-10 md:h-12 lg:h-14"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors['name'] &&
              formik.touched['name'] &&
              formik.errors['name']
            }
          />

          {/* Type */}
          <DropDown
            name="type"
            placeholder={t('form.placeholders.type')}
            value={String(formik.values['type'])}
            formik={formik}
            className="m-auto w-full lg:w-[45%]"
            translationFile="shipments"
            options={[
              {
                value: 0,
                label: 'Personne physique',
              },
              {
                value: 1,
                label: 'EURL',
              },
              {
                value: 2,
                label: 'SARL',
              },
              {
                value: 3,
                label: 'SPA',
              },
              {
                value: 4,
                label: 'SNC',
              },
              {
                value: 5,
                label: 'SCS',
              },
              {
                value: 6,
                label: 'SCA',
              },
              {
                value: 7,
                label: 'GR',
              },
              {
                value: 8,
                label: 'EPIC',
              },
            ]}
            error={
              formik.errors['type'] &&
              formik.touched['type'] &&
              formik.errors['type']
            }
          />
        </div>

        {/* RC */}
        <InputWithIcon
          type="text"
          name="rc"
          value={formik.values['rc']}
          placeholder={t('form.placeholders.rc')}
          className="mb-5 md:mb-8"
          inputClasses="font-medium bg-light-dark-3 h-10 md:h-12 lg:h-14"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.errors['rc'] && formik.touched['rc'] && formik.errors['rc']
          }
        />

        <div className="w-full flex flex-col lg:flex-row justify-between items-center">
          {/* NIF */}
          <InputWithIcon
            type="text"
            name="nif"
            value={formik.values['nif']}
            placeholder={t('form.placeholders.nif')}
            className="m-0 mb-5 w-full lg:w-[45%] md:mb-8"
            inputClasses="font-medium bg-light-dark-3 h-10 md:h-12 lg:h-14"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors['nif'] &&
              formik.touched['nif'] &&
              formik.errors['nif']
            }
          />

          {/* NIS */}
          <InputWithIcon
            type="text"
            name="nis"
            value={formik.values['nis']}
            placeholder={t('form.placeholders.nis')}
            className="m-0 mb-5 w-full lg:w-[45%] md:mb-8"
            inputClasses="font-medium bg-light-dark-3 h-10 md:h-12 lg:h-14"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors['nis'] &&
              formik.touched['nis'] &&
              formik.errors['nis']
            }
          />
        </div>

        {/* Address */}
        <InputWithIcon
          type="text"
          name="address"
          value={formik.values['address']}
          placeholder={t('form.placeholders.address')}
          className="mb-5 md:mb-8"
          inputClasses="font-medium bg-light-dark-3 h-10 md:h-12 lg:h-14"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.errors['address'] &&
            formik.touched['address'] &&
            formik.errors['address']
          }
        />

        {/* Capital */}
        <InputWithIcon
          type="text"
          name="capital"
          value={String(formik.values['capital'])}
          placeholder={t('form.placeholders.capital')}
          className="mb-5 md:mb-8"
          inputClasses="font-medium bg-light-dark-3 h-10 md:h-12 lg:h-14"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.errors['capital'] &&
            formik.touched['capital'] &&
            formik.errors['capital']
          }
        />

        {/* Employees */}
        <DropDown
          name="employees"
          placeholder={t('form.placeholders.employees')}
          className="w-full"
          value={String(formik.values['employees'])}
          formik={formik}
          translationFile="shipments"
          options={[
            {
              value: 0,
              label: '0-1 employé',
            },
            {
              value: 1,
              label: '2-10 employés',
            },
            {
              value: 2,
              label: '11-50 employés',
            },
            {
              value: 3,
              label: '51-200 employés',
            },
            {
              value: 4,
              label: '201-500 employés',
            },
            {
              value: 5,
              label: '501-1,000 employés',
            },
            {
              value: 6,
              label: '+1,000 employés',
            },
          ]}
          error={
            formik.errors['item.name'] &&
            formik.touched['item.name'] &&
            formik.errors['item.name']
          }
        />
        {/* Submit */}
        <button
          type="submit"
          className="w-full h-10 mb-3 md:h-12 lg:h-14 bg-primary text-dark font-medium rounded-lg"
        >
          {t('form.btns.submit')}
        </button>
      </form>
    </div>
  );
}
