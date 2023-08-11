import { MouseEvent, useState } from 'react';
import dynamic from 'next/dynamic';
const Link = dynamic(() => import('next/link'));
const LoadingSpinner = dynamic(
  () => import('@/components/shared-components/LoadingSpinner')
);
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
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';

type Props = {
  csrfToken: string;
};

const LoginForm = ({ csrfToken }: Props) => {
  const { t } = useTranslation(['auth', 'errors']);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      login_id: '',
      password: '',
    },

    validationSchema: Yup.object({
      login_id: Yup.string()
        .email(t('email_invalid', { ns: 'errors' }))
        .required(t('email_required'))
        .typeError(t('email_required')),
      password: Yup.string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        .required(t('password_required'))
        .typeError(t('password_invalid')),
    }),

    onSubmit: async (values) => {
      // use next-auth to login
      const { signIn } = await import('next-auth/react');

      await signIn('cafila', {
        redirect: false,
        login_id: values.login_id,
        password: values.password,
      })
        .then((res: any) => {
          if (res?.status === 200) {
            // redirect to the dashboard
            //router.push('/dashboard');
          } else {
            formik.setErrors({
              login_id: 'Authentification échouée',
              password: 'Authentification échouée',
            });
            toast.error(res?.error || 'Authentification échouée');
          }
        })
        .catch((err) => {
          //router.push("/login");
          toast.error(err?.error || err?.data || 'Authentification échouée');
        });
    },
  });
  return (
    <div className="w-10/12 h-[55vh] flex flex-col items-center justify-evenly z-10  px-4 bg-light-dark-1 rounded-lg shadow-[0px_0px_5px_2px_rgba(0,0,0,0.25)]  animate-slide-in-left sm:w-3/4 md:w-3/5 lg:w-3/5 xl:w-2/5 lg:h-[80vh] md:h-[70vh] ">
      <div className="h-[20%] w-full mx-auto flex items-center justify-center lg:my-2">
        <Image
          src="/images/png/logos/logo primary 1.png"
          alt=""
          width={300}
          height={300}
          quality={100}
          className="object-contain w-36 md:w-44 lg:w-48"
        />
      </div>

      <form
        className="w-[80%] mx-auto md:w-[65%]"
        onSubmit={formik.handleSubmit}
      >
        {/* CSRF Token */}
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        {/* Login ID */}
        <InputWithIcon
          type="text"
          name="login_id"
          placeholder={t('form.placeholders.login_id')}
          inputClasses="bg-light-dark-2 h-10 mb-5 md:h-12 lg:h-14"
          error={
            formik.errors.login_id &&
            formik.touched.login_id &&
            formik.errors.login_id
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {/* Password */}
        <InputWithIcon
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder={t('form.placeholders.password')}
          inputClasses="bg-light-dark-2 h-10 md:h-12 lg:h-14"
          error={
            formik.errors.password &&
            formik.touched.password &&
            formik.errors.password
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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

      {/* Forgot Password */}
      <div className="mt-4 font-light">
        {t('you_have_no_account_text')}
        <Link href="/register" prefetch={false}>
          <span className="font-medium">{t('click_here')}</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
