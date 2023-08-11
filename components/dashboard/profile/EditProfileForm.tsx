import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Title from '../shared-components/Title';
const OutlinedInput = dynamic(() => import('@mui/material/OutlinedInput'));

const EditProfileForm = () => {
  const router = useRouter();

  return (
    <div className="w-[95%] mx-auto min-h-[85vh] flex flex-col items-center justify-evenly z-10  px-4 bg-light-dark-2 rounded-lg shadow-[0px_0px_5px_2px_rgba(0,0,0,0.25)]   lg:w-3/5">
      {/* Title */}
      <Title title="Modifier vos informations" />

      <form
        className="w-[70%] mx-auto flex-col items-center justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          //router.push("/register/account-type");
        }}
      >
        {/* Full name */}
        <OutlinedInput
          type="text"
          name="name"
          placeholder="John Doe"
          className="bg-light-dark-3 my-3 border-none outline-none w-full px-4 rounded-md  text-white text-sm text-left flex-1 h-20 lg:text-md"
          sx={{
            width: '100%',
            textAlign: 'left',
            height: '100%',
            '& fieldset': {
              border: 'none',
            },
          }}
          inputProps={{ style: { textAlign: 'left', color: 'white' } }}
        />

        {/* Email */}
        <OutlinedInput
          type="email"
          name="email"
          placeholder="Email"
          className="bg-light-dark-3 my-3 border-none outline-none w-full px-4 rounded-md  text-white text-sm text-left flex-1 h-20 lg:text-md"
          sx={{
            width: '100%',
            textAlign: 'left',
            height: '100%',
            '& fieldset': {
              border: 'none',
            },
          }}
          inputProps={{ style: { textAlign: 'left', color: 'white' } }}
        />

        {/* Phone number */}
        <OutlinedInput
          type="text"
          name="phone_number"
          placeholder="Numéro de téléphone"
          className="bg-light-dark-3 my-3 border-none outline-none w-full px-4 rounded-md  text-white text-sm text-left flex-1 h-20 lg:text-md"
          sx={{
            width: '100%',
            textAlign: 'left',
            height: '100%',
            '& fieldset': {
              border: 'none',
            },
          }}
          inputProps={{ style: { textAlign: 'left', color: 'white' } }}
        />

        {/* Phone number */}
        <OutlinedInput
          type="text"
          name="password"
          placeholder="Mot de passe"
          className="bg-light-dark-3 my-3 border-none outline-none w-full px-4 rounded-md  text-white text-sm text-left flex-1 h-20 lg:text-md"
          sx={{
            width: '100%',
            textAlign: 'left',
            height: '100%',
            '& fieldset': {
              border: 'none',
            },
          }}
          inputProps={{ style: { textAlign: 'left', color: 'white' } }}
        />
        <div className="w-full flex items-center justify-between">
          {/* Annuler */}
          <button
            type="submit"
            className="capitalize text-lg text-center w-1/2  mr-2 h-12 mt-8 bg-light-dark-3 text-white rounded-md py-3 font-medium  shadow-lg lg:h-14"
          >
            Annuler
          </button>

          {/* Sauvegarder */}
          <button
            type="submit"
            className="capitalize text-lg text-center w-1/2  ml-2 h-12 mt-8 bg-primary text-dark rounded-md py-3 font-medium hover:bg-primary hover:bg-opacity-90 shadow-lg lg:h-14"
          >
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
