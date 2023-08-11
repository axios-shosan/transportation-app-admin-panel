import dynamic from 'next/dynamic';
const Link = dynamic(() => import('next/link'));
const IconButton = dynamic(() => import('@mui/material/IconButton'));
const InputAdornment = dynamic(() => import('@mui/material/InputAdornment'));
const VisibilityOffOutlined = dynamic(
  () => import('@mui/icons-material/VisibilityOffOutlined')
);
const VisibilityOutlined = dynamic(
  () => import('@mui/icons-material/VisibilityOutlined')
);
const Image = dynamic(() => import('next/image'));
const InputWithIcon = dynamic(
  () => import('@/components/shared-components/data-entries/InputWithIcon'),
  {
    loading: () => <LoadingSpinner />,
  }
);
import useRegisterFormContext from '@/hooks/useRegisterFormContext';
import LoadingSpinner from '@/components/shared-components/LoadingSpinner';
import { useTranslation } from 'next-i18next';

const RegisterForm = () => {
  const {
    showPassword,
    handleMouseDownPassword,
    handleClickShowPassword,
    handleNext,
    formik,
  } = useRegisterFormContext();
  const { t } = useTranslation('auth');

  return (
    <div className="w-10/12 h-[80vh] flex flex-col items-center justify-start z-10  px-4 bg-light-dark-1 rounded-lg shadow-[0px_0px_5px_2px_rgba(0,0,0,0.25)]  animate-slide-in-left sm:w-3/4 md:w-3/5 lg:w-3/5 xl:w-2/5 lg:h-[80vh] md:h-[70vh] ">
      <div className="h-[20%] w-full mx-auto flex items-center justify-center my-2">
        <Image
          src="/images/png/logos/logo primary 1.png"
          alt=""
          width={300}
          height={300}
          quality={100}
          className="object-contain w-36 md:w-44 lg:w-48'"
        />
      </div>

      <form
        className="w-[80%] mx-auto flex-col items-center justify-center md:w-[65%]"
        onSubmit={
          // check if the form is valid
          formik.isValid
            ? // if it is valid, call the handleNext function
              handleNext
            : // if it is not valid, highlight the errors
              formik.setErrors({
                name: 'Veuillez entrer votre nom et prénom',
                email: 'Veuillez entrer votre email',
                password: 'Veuillez entrer votre mot de passe',
              })
        }
      >
        {/* Full name */}
        <InputWithIcon
          type="text"
          name="name"
          placeholder={t('form.placeholders.name')}
          inputClasses="bg-light-dark-2 h-10 mb-5 md:h-12 lg:h-14"
          error={
            formik.errors['name'] &&
            formik.touched['name'] &&
            formik.errors['name']
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {/* Email */}
        <InputWithIcon
          type="email"
          name="email"
          placeholder={t('form.placeholders.name')}
          inputClasses="bg-light-dark-2 h-10 mb-5 md:h-12 lg:h-14"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.errors['email'] &&
            formik.touched['email'] &&
            formik.errors['email']
          }
        />

        {/* Password */}
        <InputWithIcon
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder={t('form.placeholders.name')}
          inputClasses="bg-light-dark-2 h-10 mb-5 md:h-12 lg:h-14"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.errors['password'] &&
            formik.touched['password'] &&
            formik.errors['password']
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                sx={{ color: 'white' }}
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                //edge="end"
              >
                {showPassword ? (
                  <VisibilityOffOutlined
                    classes={{
                      root: 'fill-blue-text  opacity-40',
                    }}
                  />
                ) : (
                  <VisibilityOutlined
                    classes={{
                      root: 'fill-blue-text  opacity-40',
                    }}
                  />
                )}
              </IconButton>
            </InputAdornment>
          }
        />

        {/* Phone number */}
        <InputWithIcon
          type="text"
          name="phone_number"
          placeholder={t('form.placeholders.name')}
          inputClasses="bg-light-dark-2 h-10 md:h-12 lg:h-14"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.errors['phone_number'] &&
            formik.touched['phone_number'] &&
            formik.errors['phone_number']
          }
        />

        {/* Submit */}
        <button
          type="submit"
          className="capitalize text-base text-center w-full h-10 mt-8 bg-primary text-dark rounded-md font-medium hover:bg-primary hover:bg-opacity-90 lg:h-14 md:h-12 md:text-lg"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <LoadingSpinner />
          ) : (
            <>{t('form.btns.submit')}</>
          )}
        </button>
      </form>

      {/* Login link */}
      <div className="mt-4 font-light">
        {t('you_have_account_text')}
        <Link href="/login" prefetch={false}>
          <span className="font-medium">{t('click_here')}</span>
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
