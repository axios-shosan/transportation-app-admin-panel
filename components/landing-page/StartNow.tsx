import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
const Image = dynamic(() => import('next/image'));

const StartNow = () => {
  const { t } = useTranslation('home');
  return (
    <div className="relative w-full h-[45vh] flex flex-col items-center justify-center z-10">
      <Image
        src="/images/png/bg/login-register bg.png"
        alt="auth bg"
        layout="fill"
        objectFit="cover"
        className="-z-10 w-full h-full opacity-20"
      />
      {/* Title */}
      <h2 className="ml-6 mb-14 text-3xl font-semibold lg:text-5xl md:text-4xl md:ml-10">
        {t('start_now_title')}
      </h2>
      {/* Submit */}
      <button className="text-lg text-center  w-64 h-12 mt-6 bg-primary text-dark rounded-md py-3 font-medium hover:bg-primary lg:h-14 lg:w-96">
        {t('start_now_btn_label')}
      </button>
    </div>
  );
};

export default StartNow;
