import Image from 'next/image';

type Props = {
  selected?: boolean;
  className?: string;
};

export const ProfesionalAccountIcon = ({
  selected = false,
  className = '',
}: Props) => {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 805.73 807.13"
      className={className ?? ''}
    >
      <path
        className={`${selected ? 'cls-2' : 'cls-1'}`}
        d="M386.62,699.55H115.46V346.53c0-33.65,27.28-60.93,60.93-60.93h149.31c33.65,0,60.93,27.28,60.93,60.93v243.67"
      />
      <path
        className={`${selected ? 'cls-2' : 'cls-1'}`}
        d="M386.62,221.79v-10.39c0-33.65,27.28-60.93,60.93-60.93h181.8c33.65,0,60.93,27.28,60.93,60.93v488.15h-244.82"
      />
      <path
        className={`${selected ? 'cls-2' : 'cls-1'}`}
        d="M595.38,699.55v-89.66c0-24.76-20.07-44.84-44.84-44.84h-24.2c-24.76,0-44.84,20.07-44.84,44.84v89.66"
      />
      <path
        className={`${selected ? 'cls-2' : 'cls-1'}`}
        d="M312.12,699.55v-89.66c0-24.76-20.07-44.84-44.84-44.84h-24.2c-24.76,0-44.84,20.07-44.84,44.84v89.66"
      />
      <g>
        <rect
          className={`${selected ? 'cls-2' : 'cls-1'}`}
          x="450.37"
          y="233.88"
          width="62.63"
          height="62.63"
          rx="18.58"
          ry="18.58"
        />
        <rect
          className={`${selected ? 'cls-2' : 'cls-1'}`}
          x="563.89"
          y="233.88"
          width="62.63"
          height="62.63"
          rx="18.58"
          ry="18.58"
        />
        <rect
          className={`${selected ? 'cls-2' : 'cls-1'}`}
          x="450.37"
          y="340.12"
          width="62.63"
          height="62.63"
          rx="18.58"
          ry="18.58"
        />
        <rect
          className={`${selected ? 'cls-2' : 'cls-1'}`}
          x="563.89"
          y="340.12"
          width="62.63"
          height="62.63"
          rx="18.58"
          ry="18.58"
        />
      </g>
      <g>
        <rect
          className={`${selected ? 'cls-2' : 'cls-1'}`}
          x="167.12"
          y="339.36"
          width="62.63"
          height="62.63"
          rx="18.58"
          ry="18.58"
        />
        <rect
          className={`${selected ? 'cls-2' : 'cls-1'}`}
          x="280.63"
          y="339.36"
          width="62.63"
          height="62.63"
          rx="18.58"
          ry="18.58"
        />
      </g>
    </svg>
  );
};

export const ParticularAccountIcon = ({
  selected = false,
  className = '',
}: Props) => {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 710.34 736.05"
      className={className ?? ''}
    >
      <circle
        className={`${selected ? 'cls-2' : 'cls-1'}`}
        cx="380.35"
        cy="227.91"
        r="138.56"
      />
      <path
        className={`${selected ? 'cls-2' : 'cls-1'}`}
        d="M518.18,395.2l59.65,31.84c20.42,10.93,34.45,30.79,37.87,53.63l17.72,158.48H128.28s17.72-158.48,17.72-158.48c3.41-22.84,17.44-42.71,37.87-53.63l59.65-31.84"
      />
    </svg>
  );
};

export const TransportationActivityIcon = ({
  selected = false,
  className = '',
}: Props) => {
  return (
    <Image
      src={
        selected
          ? '/images/png/transportation activity selected.png'
          : '/images/png/transportation activity.png'
      }
      alt="transportation activity"
      width={80}
      height={80}
      className={className ?? ''}
    />
  );
};

export const ExpeditionActivityIcon = ({
  selected = false,
  className = '',
}: Props) => {
  return (
    <Image
      src={
        selected
          ? '/images/png/expedition activity selected.png'
          : '/images/png/expedition activity.png'
      }
      alt="expedition activity"
      width={80}
      height={80}
      className={className ?? ''}
    />
  );
};
