import { useTranslation } from 'next-i18next';

const Steps = () => {
  const { t } = useTranslation('home');
  const steps = [
    {
      number: 1,
      description: t('step_1'),
    },
    {
      number: 2,
      description: t('step_2'),
    },
    {
      number: 3,
      description: t('step_3'),
    },
  ];
  return (
    <div className="w-full flex flex-col items-center justify-center mt-16 md:flex-row">
      {steps.map((step, index) => (
        <div
          className={`mx-auto  w-3/5 h-48  bg-light-dark-2 rounded-xl text-white px-3 py-3 flex flex-col items-start shadow-[0px_0px_5px_2px_rgba(0,0,0,0.25)] lg:h-48 lg:w-[27%] md:w-[30%] ${
            index == 0 ? 'mb-3' : index == 1 ? 'mb-3' : ''
          } md:mb-0`}
          key={index}
        >
          <h2 className="text-4xl font-bold lg:text-5xl">0{step.number}</h2>
          <p className="w-11/12 text-white mt-3 font-medium lg:text-lg lg:w-10/12">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Steps;
