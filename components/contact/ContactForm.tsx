import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
const OutlinedInput = dynamic(() => import('@mui/material/OutlinedInput'));

const ContactForm = () => {
  const router = useRouter();

  return (
    <div className="w-full max-w-[700px] mx-auto min-h-[80vh] flex flex-col items-center justify-center z-10  px-4  lg:w-3/5 md:w-[3/5] sm:w-[80%]">
      <form
        className="w-full flex-col items-center justify-center mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          router.push('/register/account-type');
        }}
      >
        <div className="flex w-full items-center">
          {/* nom */}
          <OutlinedInput
            type="text"
            name="first_name"
            placeholder="Entrer votre nom"
            className="h-12 bg-light-dark-2 my-3 border-none outline-none w-full mr-2 px-2 rounded-md  !text-white text-sm text-left flex-1 lg:h-14 lg:text-md md:px-3"
            sx={{
              width: '100%',
              textAlign: 'left',
              '& fieldset': {
                border: 'none',
              },
            }}
            inputProps={{ style: { textAlign: 'left' } }}
          />
          {/* prénom */}
          <OutlinedInput
            type="text"
            name="last_name"
            placeholder="Entrer votre prénom"
            className="h-12 bg-light-dark-2 my-3 border-none outline-none w-full ml-2 px-2 rounded-md  !text-white text-sm text-left flex-1 lg:h-14 lg:text-md md:px-3"
            sx={{
              width: '100%',
              textAlign: 'left',
              '& fieldset': {
                border: 'none',
              },
            }}
            inputProps={{ style: { textAlign: 'left' } }}
          />
        </div>

        {/* Email */}
        <OutlinedInput
          type="email"
          name="email"
          placeholder="Entrer votre émail"
          className="h-12 bg-light-dark-2 my-3 border-none outline-none w-full px-2 rounded-md  !text-white text-sm text-left flex-1 lg:h-14 lg:text-md md:px-3"
          sx={{
            width: '100%',
            textAlign: 'left',
            height: '50px',
            '& fieldset': {
              border: 'none',
            },
          }}
          inputProps={{ style: { textAlign: 'left' } }}
        />

        {/* Phone number */}
        <OutlinedInput
          type="text"
          name="phone_number"
          placeholder="Entrer votre numéro de téléphone"
          className="h-12 bg-light-dark-2 my-3 border-none outline-none w-full px-2 rounded-md  !text-white text-sm text-left flex-1 lg:h-14 lg:text-md md:px-3"
          sx={{
            width: '100%',
            textAlign: 'left',
            height: '50px',
            '& fieldset': {
              border: 'none',
            },
          }}
          inputProps={{ style: { textAlign: 'left' } }}
        />

        {/* Message */}
        <OutlinedInput
          type="text"
          name="message"
          placeholder="Entrer votre message..."
          className="bg-light-dark-2 my-3 border-none outline-none w-full px-6 rounded-md  !text-white text-sm text-left flex-1 h-32 lg:text-md overflow-y-auto"
          sx={{
            width: '100%',
            textAlign: 'left',
            '& fieldset': {
              border: 'none',
            },
          }}
          inputProps={{ style: { textAlign: 'left' } }}
          multiline
          rows={5}
        />

        {/* Submit */}
        <button
          type="submit"
          className="capitalize text-lg w-1/2 flex justify-center items-center mx-auto h-12 mt-8 bg-primary text-dark rounded-md py-3 font-medium hover:bg-primary hover:bg-opacity-90 lg:h-14"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
