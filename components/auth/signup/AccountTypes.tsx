import { useState } from 'react';
import useRegisterFormContext from '@/hooks/useRegisterFormContext';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
type Props = {
  pageTitle: string;
};

const AccountTypes = ({ pageTitle }: Props) => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const {
    accountTypes,
    setAccountTypes,
    handleAccountType,
    handleNext,
    formik,
  } = useRegisterFormContext();
  const { t } = useTranslation('auth');

  return (
    <div
      className={`z-10 h-[75vh] bg-light-dark-1  m-auto flex flex-col items-center justify-evenly rounded-lg animate-slide-in-left ${
        accountTypes.length === 3 ? 'w-3/4' : 'w-[60%]'
      }`}
    >
      <h2 className="text-5xl font-medium">{pageTitle}</h2>

      <div className="w-1/2 mx-auto flex items-center justify-between">
        {accountTypes.map(({ title, selected, Icon }, index) => (
          <div
            key={index}
            className={`w-[40%] h-40 bg-light-dark-2 mt-4 flex flex-col items-center justify-evenly rounded-2xl cursor-pointer ${
              selected && 'border-2 text-primary border-primary'
            }`}
            onClick={() => {
              handleAccountType(title);
              setAccountTypes(
                accountTypes.map((type, i) => {
                  return i === index
                    ? { ...type, selected: true }
                    : { ...type, selected: false };
                })
              );
              setEnabled(true);
            }}
          >
            <Icon selected={selected} />
            <h3
              className={`text-2xl font-medium ${
                selected ? 'text-primary' : 'text-light-dark-4'
              }`}
            >
              {title}
            </h3>
          </div>
        ))}
      </div>
      <button
        className={`capitalize text-lg text-center w-1/3 h-12 bg-primary text-dark rounded-md py-3 font-medium lg:h-14 ${
          enabled ? 'cursor-pointer' : 'cursor-not-allowed bg-light-dark-3'
        }`}
        disabled={!enabled}
        onClick={
          enabled
            ? formik.handleSubmit
            : () => toast.error('Veuillez choisir un type de compte')
        }
      >
        {t('form.btns.register')}
      </button>
    </div>
  );
};

export default AccountTypes;
