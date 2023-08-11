import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
const DashboardStatsCard = dynamic(() => import('./DashboardStatsCard'), {
  ssr: false,
});

const DashboardStats = () => {
  const { t } = useTranslation('dashboard');

  const stats = [
    {
      title: t('dashboardStats.shipment'),
      value: 0,
    },
    {
      title: t('dashboardStats.inProcess'),
      value: 0,
    },
    {
      title: t('dashboardStats.done'),
      value: 0,
    },
    {
      title: t('dashboardStats.planned'),
      value: 0,
    },
    {
      title: t('dashboardStats.shipment'),
      value: 0,
    },
    {
      title: t('dashboardStats.inProcess'),
      value: 0,
    },
    {
      title: t('dashboardStats.done'),
      value: 0,
    },
    {
      title: t('dashboardStats.planned'),
      value: 0,
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 w-full mt-4 mx-auto lg:grid-cols-4 md:grid-cols-3">
      {stats &&
        stats.map((stat, index) => (
          <DashboardStatsCard
            key={index}
            title={stat.title}
            value={stat.value}
          />
        ))}
    </section>
  );
};

export default DashboardStats;
