import dynamic from "next/dynamic";
const Link = dynamic(() => import("next/link"));
const Image = dynamic(() => import("next/image"));

type Props = {
  white?: boolean;
  className?: string;
};

const Logo = ({ white = false, ...props }: Props) => {
  return (
    <Link
      href='/'
      prefetch={false}
      passHref
      className={`z-20 h-8 relative w-28 sm:w-40 md:w-44 ${props?.className}`}
    >
      <Image
        src={`${
          white
            ? '/images/png/logos/logo white 1.png'
            : '/images/png/logos/logo primary 1.png'
        }`}
        alt=''
        className='object-contain'
        width={200}
        height={100}
      />
    </Link>
  )
};

export default Logo;
