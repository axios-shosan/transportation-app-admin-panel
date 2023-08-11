import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
const CardInfos = dynamic(() => import('./CardInfos'), {});

const WhyChooseUs = () => {
  const { t } = useTranslation('home');
  const cards = [
    {
      title: t('why_choose_us_card.0.title'),
      description: t('why_choose_us_card.0.description'),
      icon: 'location.svg',
    },
    {
      title: t('why_choose_us_card.1.title'),
      description: t('why_choose_us_card.1.description'),
      icon: 'security.svg',
    },
    {
      title: t('why_choose_us_card.2.title'),
      description: t('why_choose_us_card.2.description'),

      icon: 'security.svg',
    },
  ];

  return (
    <div className="w-full mt-32">
      {/* Title */}
      <h2 className="ml-6 mb-14 text-3xl font-semibold md:text-4xl lg:text-5xl md:ml-10">
        {t('why_choose_us_title')}
      </h2>

      {/* Cards */}
      <div className="bg-light-dark-2 w-full min-h-[40vh] px-5 py-10  grid grid-cols-3 gap-x-8 gap-y-24 items-start md:gap-x-16 lg:gap-x-20">
        {cards.map((card, index) => (
          <CardInfos card={card} key={index} />
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
