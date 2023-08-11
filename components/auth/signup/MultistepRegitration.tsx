import dynamic from 'next/dynamic';
import useRegisterFormContext from '@/hooks/useRegisterFormContext';
import LoadingSpinner from '@/components/shared-components/LoadingSpinner';
const RegisterSuccess = dynamic(() => import('./RegisterSuccess'), {
  loading: () => <LoadingSpinner />,
});
const RegisterForm = dynamic(() => import('./RegisterForm'), {
  loading: () => <LoadingSpinner />,
});
const AccountTypes = dynamic(() => import('./AccountTypes'), {
  loading: () => <LoadingSpinner />,
});

const MultistepRegitrationForm = () => {
  const { step, accountType } = useRegisterFormContext();
  return (
    <div className="z-10 w-full h-screen flex items-center justify-center">
      {step === 0 ? (
        <RegisterForm />
      ) : step === 1 ? (
        <AccountTypes pageTitle="Veuillez choisir le type de compte." />
      ) : (
        <RegisterSuccess />
      )}
    </div>
  );
};

export default MultistepRegitrationForm;
