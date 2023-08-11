import dynamic from 'next/dynamic';
const Image = dynamic(() => import('next/image'));

const VehiculesCarousel = () => {
  return (
    <div className="flex-1 h-full relative mt-6">
      <section className="w-[78vw] relative flex items-center justify-end lg:mt-[-100px] z-2">
        <Image
          src="/images/png/vehicules/big van.png"
          alt="big vehicule"
          //className='z-[1] absolute  top-[50px] animate-[slide-in-left-1_8s_ease-in-out_infinite] lg:w-full lg:top-[100px] md:-top-[100px]'
          className="w-full z-[1] absolute  top-[50px] right-0 lg:top-[0px] bottom-0 md:-top-[100px]"
          quality={100}
          width={1400}
          height={820}
        />
        {/* <Image
          src='/images/png/vehicules/medium van.png'
          alt='medium vehicule'
          className='z-[2] absolute   translate-x-[200%] top-[60px] animate-[slide-in-left-2_8s_ease-in-out_infinite]  w-10/12 lg:w-[80%]  lg:top-[120px] md:-top-[100px]'
          quality={100}
          width={650}
          height={400}
        />
         <Image
          src='/images/png/vehicules/small van.png'
          alt='small vehicule'
          className='z-[3] absolute  translate-x-[200%] top-[50px] right-14 animate-[slide-in-left-3_8s_ease-in-out_infinite]   w-[90%] lg:w-[80%] lg:top-[200px] md:-top-[100px]'
          quality={100}
          width={550}
          height={353}
        /> */}
      </section>
    </div>
  );
};

export default VehiculesCarousel;
