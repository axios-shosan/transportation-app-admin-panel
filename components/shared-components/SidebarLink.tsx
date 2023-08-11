import { useRouter } from 'next/router';
import useSidebarContext from '@/hooks/useSidebarContext';
import { Tooltip } from '@mui/material';

type Props = {
  title: string;
  Icon: any;
  index: number;
  href?: string;
};

const SidebarLink = ({ title, Icon, index, href }: Props) => {
  const router = useRouter();
  const { selectedLink, setSelectedLink } = useSidebarContext();
  const selected = selectedLink === index;

  return (
    <Tooltip title={title}>
      <div
        className={`h-14 flex flex-col items-center justify-evenly w-full rounded-md my-2  hover:cursor-pointer transition-all duration-250
      ${
        selected
          ? 'bg-light-dark-3 shadow-sm hover:cursor-not-allowed'
          : 'hover:bg-light-dark-3 hover:bg-opacity-20'
      }
      
     sm:h-16 md:h-24`}
        onClick={() => {
          //setSelectedLink(index);
          !selected && href && router.push(href);
        }}
      >
        <Icon
          selected={selected}
          // because the vehicle icon is smaller than the other icons we need to find it and give it a different size
          className={`h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10
            ${
              title === 'Véhicules'
                ? 'h-12 w-12 sm:h-12 sm:w-12 md:h-16 md:w-16'
                : ''
            }
          `}
        />
        <p
          className={`text-sm text-center hidden ${
            selected ? 'text-primary' : 'text-light-dark-4'
          } md:block`}
        >
          {title}
        </p>
      </div>
    </Tooltip>
  );
};

export default SidebarLink;
