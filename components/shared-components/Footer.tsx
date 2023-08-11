import { TFunction } from 'next-i18next';
import dynamic from 'next/dynamic';
const Link = dynamic(() => import('next/link'));
const Logo = dynamic(() => import('./Logo'));

type Props = {
  t?: TFunction;
};
const Footer = ({ t }: Props) => {
  // transform the bellow links into a map
  const links = [
    {
      title: 'Acceuil',
      links: [
        {
          title: 'A propos',
          href: '',
        },
        {
          title: 'Contactez-nous',
          href: '/contact',
        },
      ],
    },
    {
      title: 'Réseaux',
      links: [
        {
          title: 'Facebook',
          href: '',
        },
        {
          title: 'Linkedin',
          href: '',
        },
      ],
    },
    {
      title: 'Particulier',
      links: [
        {
          title: 'Transporteur',
          href: '',
        },
        {
          title: 'Client',
          href: '',
        },
      ],
    },
    {
      title: 'Business',
      links: [
        {
          title: 'Transportation',
          href: '',
        },
        {
          title: 'Expédition',
          href: '',
        },
      ],
    },
  ];

  return (
    <>
      <footer className="w-[95%] mx-auto flex flex-col justify-between bg-blue-darker pt-6 pb-6 md:flex-row md:pt-12">
        <div className="flex flex-col items-start mb-3 md:w-1/5">
          {/* Logo */}
          <Logo />
          <p className="font-thin">la revilution de logistiques</p>
        </div>

        {/* Links */}
        <div className="w-full mx-auto flex items-start justify-between md:w-3/5 md:justify-end">
          {links.map((link, index1) => (
            <div
              className="flex flex-col items-start justify-center w-1/5"
              key={index1}
            >
              <p className="text-white transition-all duration-300 my-3 text-sm md:text-base">
                {link.title}
              </p>
              {link.links.map((link, index2) => (
                <Link
                  href={link.href}
                  prefetch={false}
                  className="text-white font-light transition-all duration-300  hover:translate-x-1 hover:text-gray-400 my-3 text-sm md:text-base"
                  key={index2}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </footer>
      <p className="mt-3 pb-3 text-gray-400 w-full text-center font-light text-sm :md:text-base">
        &copy; CAFILA. Tout les droits sont réservées.
      </p>
    </>
  );
};

export default Footer;
