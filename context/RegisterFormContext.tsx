import React, { createContext, MouseEvent, useEffect, useState } from 'react';
import { RegisterFormContextProps } from '../interfaces/register';
import { ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { useSignUpMutation } from '../redux/api/apiSlice';
import {
  ExpeditionActivityIcon,
  ParticularAccountIcon,
  ProfesionalAccountIcon,
  TransportationActivityIcon,
} from '@/components/icons/registerIcons';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';

const RegisterFormCotext = createContext<RegisterFormContextProps>({
  step: 0,
  handleNext: () => {},
  handleBack: () => {},
  accountType: '',
  handleAccountType: () => {},
  accountTypes: [] as {
    title: string;
    selected: boolean;
    Icon: React.Component;
  }[],
  setAccountTypes: () => {},
  showPassword: false,
  setShowPassword: () => {},
  handleClickShowPassword: () => {},
  handleMouseDownPassword: () => {},
  error: '',
  formik: {},
});

export const RegisterFormProvider = ({ children }) => {
  const { t } = useTranslation(['auth', 'errors']);
  const [signUp, { isLoading }] = useSignUpMutation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      phone_number: '',
      name: '',
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('email_required'))
        .required(t('email_required')),
      password: Yup.string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        .required(t('password_required'))
        .typeError(t('password_invalid')),
      phone_number: Yup.string()
        .matches(/^0[5|6|7]\d{8}$/, t('phone_number_invalid'))
        .required(t('phone_number_required'))
        .typeError(t('phone_number_invalid')),
      name: Yup.string()
        .required(t('name_required'))
        .typeError(t('name_invalid')),
    }),
    onSubmit: async (values) => {
      signUp({
        name: values.name,
        email: values.email,
        password: values.password,
        phone_number: values.phone_number,
        shipper: accountType === 'Expédition' ? 1 : 0,
        carrier: accountType === 'Transportation' ? 1 : 0,
      })
        .unwrap()
        .then((res) => {
          handleNext();
        })
        .catch((error) => {
          setError(error.data);
          // return to step 0
          setStep(0);
          toast.error(error.data);

          // empty form fields
          formik.resetForm();

          // emty error message after 3 seconds
          setTimeout(() => {
            setError('');
          }, 3000);
        });
      // use axios to make a post request to the backend

      formik.setSubmitting(false);
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const [step, setStep] = useState<number>(0);
  const [accountType, setAccountType] = useState<string>('');
  const [accountTypes, setAccountTypes] = useState<
    { title: string; selected: boolean; Icon: any }[]
  >([]);

  const handleNext = () => {
    setStep((step) => step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleAccountType = (type: string) => {
    setAccountType(type);
  };

  useEffect(() => {
    if (step === 1 && accountType === '') {
      setAccountTypes([
        {
          title: t('carrier'),
          selected: false,
          Icon: TransportationActivityIcon,
        },
        {
          title: t('shipper'),
          selected: false,
          Icon: ExpeditionActivityIcon,
        },
      ]);
    }
  }, [step, accountType]);

  return (
    <RegisterFormCotext.Provider
      value={{
        showPassword,
        setShowPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        formik,
        step,
        handleNext,
        handleBack,
        accountType,
        accountTypes,
        handleAccountType,
        setAccountTypes,
        error,
      }}
    >
      {children}
    </RegisterFormCotext.Provider>
  );
};

export default RegisterFormCotext;
