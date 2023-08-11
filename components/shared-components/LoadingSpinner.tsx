import { CircularProgress } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <CircularProgress
      className="text-primary w-full mx-auto "
      color="inherit"
    />
  );
};

export default LoadingSpinner;
