import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Chart,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useTranslation } from 'next-i18next';
Chart.register(zoomPlugin);

type Props = {};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  bezierCurve: true,
  elements: {
    line: {
      tension: 0.4,
    },
  },

  // read data from lines on hover
  tooltips: {
    mode: 'index' as const,
    intersect: false,
  },
  // read data from lines on hover
  hover: {
    mode: 'nearest' as const,
    intersect: true,
  },

  // X and Y axes labels colors
  scales: {
    x: {
      ticks: {
        color: 'rgba(255, 255, 255, 1)',
      },
    },
    y: {
      ticks: {
        color: 'rgba(255, 255, 255, 1)',
      },
    },
  },

  plugins: {
    legend: {
      position: 'top' as const,
    },
    // zoom
    zoom: {
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        drag: {
          enabled: true,
        },
        mode: 'x',
      },
    },
  },
};

export default function DashboardCharts({}: Props) {
  const { t } = useTranslation(['dashboard', 'common']);

  const labelsDesk = t('months.desktop', { returnObjects: true }) as string[];
  const labelsMob = t('months.mobile', { returnObjects: true }) as string[];

  const data = {
    labels: window?.innerWidth < 768 ? labelsMob : labelsDesk,

    // read data from lines on hover
    datasets: [
      {
        label: window?.innerWidth < 768 ? '' : t('dashboardChart.shipments'),
        data: [10, 20, 30, 20, 50, 100, 90, 80, 60, 40, 30, 10],
        borderColor: 'rgba(244, 200, 67, 1)',
        backgroundColor: 'rgba(244, 200, 67, 0.5)',
      },
      {
        label:
          window?.innerWidth < 768
            ? ''
            : t('dashboardChart.shipments_confirmed'),
        data: [50, 30, 150, 10, 40, 60, 80, 90, 100, 110, 120, 130],
        borderColor: 'rgb(3, 255, 59)',
        backgroundColor: 'rgba(3, 255, 59, 0.5)',
      },
    ],
  };


  if (typeof window == 'undefined') return null;
  return (
    <div className="h-[100%] w-full  mt-10  bg-light-dark-2 rounded-md p-3">
      <Line options={options as any} data={data} />
    </div>
  );
}
