import Image from 'next/image';

export default function LoadingPage() {
  return (
    <div className="z-0 fixed inset-0 h-screen w-screen bg-dark flex items-center justify-center">
      <Image
        src={'/images/png/logos/logo primary 1.png'}
        alt={'Cafila'}
        width={400}
        height={200}
        className='z-100 animate-pulse'
      />
    </div>
  );
}
