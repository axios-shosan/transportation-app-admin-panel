import InputWithIcon from './data-entries/InputWithIcon';
import LoadingSpinner from './LoadingSpinner';
import { useRouter } from 'next/router';
import { FormProps } from '@/interfaces/form';
import 'dayjs/locale/fr';
import DropDown from './data-entries/DropDown';
import DateTime from './data-entries/DateTime';
import { useTranslation } from 'next-i18next';

type Props = {
  form: FormProps;
  formik: any;
  translationFile: string;
  initialValues?: any;
  setOpen?: (value: boolean) => void;
};

export default function RenderForm({
  form,
  formik,
  translationFile,
  ...props
}: Props) {
  const router = useRouter();
  const { t } = useTranslation(translationFile);

  return (
    <form
      className={`w-[75%] mx-auto flex-col items-center justify-center ${form.formClassName} max-w-[700px]`}
      onSubmit={formik.handleSubmit}
    >
      {form.inputs.map((item, index) => {
        if (item.component === 'text')
          return (
            <InputWithIcon
              key={index}
              type={item.type}
              name={item.name}
              value={formik.values[item.name]}
              placeholder={t(item.placeholder)}
              className={`mb-5 md:mb-8 ${item.className}`}
              inputClasses={`font-medium bg-light-dark-3 h-10 md:h-12 lg:h-14  ${item.inputClasses}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors[item.name] &&
                formik.touched[item.name] &&
                formik.errors[item.name]
              }
            />
          );
        else if (item.component === 'drop-down')
          return (
            <DropDown
              name={item.name}
              value={formik.values[item.name]}
              formik={formik}
              options={item.options}
              placeholder={t(item.placeholder)}
              className="w-full"
              translationFile={translationFile}
            />
          );
        else if (item.component === 'date')
          return (
            <div className="relative flex items-center m-auto rounded-md transition-all duration-300 mb-5 md:mb-8">
              <DateTime
                name={item.name}
                placeholder={t(item.placeholder)}
                formik={formik}
              />
            </div>
          );
      })}
      <div
        className={`mt-10 w-full flex items-center justify-between ${form.buttonsContainerClassName}`}
      >
        {form.buttons.map((button, index) => {
          console.log(button.text);
          console.log(t(button.text));
          return (
            <button
              key={index}
              className={`capitalize text-sm text-center w-1/2  mr-2 h-12 mt-8 bg-light-dark-3 text-white rounded-md py-3 font-medium  shadow-lg lg:h-14 sm:text-base md:text-lg ${
                button.type === 'submit' && '!bg-primary !text-dark'
              } ${button.className}`}
              type={button.type}
              onClick={() => {
                if (button.type === 'reset') {
                  if (props.setOpen) props.setOpen(false);
                }
                if (button.type !== 'submit')
                  if (window.history.length > 1)
                    //if he came from another page to the form page  we redirect him to that page, else if he opens directly the form page, with no previous page, we redirect him to dashboard
                    router.back();
                  else router.push('/dashboard');
              }}
            >
              {formik.isSubmitting ? <LoadingSpinner /> : <>{t(button.text)}</>}
            </button>
          );
        })}
      </div>
    </form>
  );
}
