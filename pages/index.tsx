import Layout from '../layouts/BaseLayout';
import Link from 'next/link';
import Image from 'next/image';
import StartNow from '@/components/landing-page/StartNow';
import Steps from '@/components/landing-page/Steps';
import WhyChooseUs from '@/components/landing-page/WhyChooseUs';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const IndexPage = () => {
  const { t } = useTranslation('home');
  return (
    <Layout title="Acceuil | Cafila">
      <div className="h-full w-full mx-auto relative overflow-x-hidden">
        {/* Title & Truck */}
        <div className="relative h-fit flex flex-col lg:flex-row">
          {/* Title */}
          <h1 className="w-11/12 mx-auto text-left font-extrabold text-3xl  mt-12 uppercase leading-tight lg:text-6xl md:text-5xl sm:text-4xl lg:mt-16">
            {t('title.firstline.white')}{' '}
            <span className="text-primary">{t('title.firstline.green')}</span>
            <br />
            {t('title.secondline.white')}{' '}
            <span className="text-primary">{t('title.secondline.green')}</span>
          </h1>
          <Image
            src="/images/png/vehicules/big van.png"
            alt="big vehicule"
            className="w-full lg:absolute lg:top-[90%] lg:-right-10 lg:w-9/12"
            quality={100}
            width={1400}
            height={820}
          />
        </div>

        <div className="w-11/12 mx-auto  flex flex-col justify-between items-center lg:h-[450px] lg:flex-row">
          <div className="w-full mr-auto  h-full flex flex-col items-start justify-evenly lg:w-1/4">
            <p className="text-base text-left w-full font-light mb-6 lg:my-1 md:text-xl">
              {t('description')}
            </p>
            <Link
              href="/login"
              className=" text-lg text-center w-64 h-12 bg-primary text-dark rounded-md py-3 font-medium hover:bg-primary lg:h-14 lg:w-96"
            >
              {t('start_now_btn')}
            </Link>
          </div>
        </div>

        {/* Cafila Steps */}
        <Steps />
      </div>

      {/* Why choose us */}
      <WhyChooseUs />

      {/* Start now */}
      <StartNow />
    </Layout>
  );
};

export default IndexPage;

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'home', 'baseNavbar'])),
  },
});
