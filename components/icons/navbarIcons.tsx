type Props = {
  selected?: boolean;
  className?: string;
};

export const AvatarIcon = ({ selected = false, className = "" }: Props) => (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 710.34 736.05"
    className={className ?? ""}
  >
    <circle className="cls-1" cx="380.35" cy="227.91" r="138.56" />
    <path
      className="cls-1"
      d="M518.18,395.2l59.65,31.84c20.42,10.93,34.45,30.79,37.87,53.63l17.72,158.48H128.28s17.72-158.48,17.72-158.48c3.41-22.84,17.44-42.71,37.87-53.63l59.65-31.84"
    />
  </svg>
);
