import dynamic from "next/dynamic";
const Image = dynamic(() => import("next/image"));
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

const RegisterSuccess = () => {
  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-between z-10  px-4 pt-8 pb-20 bg-light-dark-1 rounded-lg shadow-[0px_0px_5px_2px_rgba(0,0,0,0.25)]  animate-slide-in-left lg:w-4/5">
      <div className="h-[20%] w-full mx-auto flex items-center justify-center my-2">
        <Image
          src="/images/png/logos/logo primary 1.png"
          alt=""
          width={300}
          height={300}
          quality={100}
          className="object-contain"
        />
      </div>

      <h1 className="text-5xl font-medium w-10/12 text-center mx-auto ">
        Nous avons bien reçu votre inscription et nous vous contacterons très
        prochainement pour la valider.
      </h1>
      {/* Login link */}
      <div className="flex items-center justify-center font-light h-16 w-16 rounded-full bg-primary font-bold! text-3xl">
        <CheckRoundedIcon className="!text-5xl "/>
      </div>
    </div>
  );
};

export default RegisterSuccess;
