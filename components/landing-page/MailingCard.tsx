import dynamic from "next/dynamic";
const Image = dynamic(() => import("next/image"));

const MailingCard = () => {
  return (
    <div className="relative h-44 w-[420px] rounded-xl flex flex-col items-center justify-start py-5 shadow-sm shadow-light-dark-2 z-10">
      {/* Background */}
      <Image
        src="/images/png/bg/mailing list card bg.png"
        alt="mailing list card bg"
        layout="fill"
        className="-z-10 w-full h-full"
      />

      {/* Title */}
      <h1 className="w-10/12 text-left text-2xl font-semibold mt-4 ml-3 uppercase mb-3">
        commencez gratuitement.
      </h1>

      {/* Email */}
      <form className="mx-auto h-10 flex items-center lg:h-12 ">
        <input
          type="text"
          placeholder="Entrer votre émail"
          className="border-none outline-none bg-white px-4 h-full w-10/12 rounded-lg text-xl mr-2 text-dark font-light lg:w-[80%]"
        />
        <button
          type="submit"
          className="text-dark border-none outline-none flex-1 px-1 text-xs h-full  bg-primary text-blue rounded-lg hover:bg-primary hover:bg-opacity-90 font-medium lg:px-3 lg:text-base md:text-sm"
        >
          Go!
        </button>
      </form>
    </div>
  );
};

export default MailingCard;
