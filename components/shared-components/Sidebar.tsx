import dynamic from 'next/dynamic';
import useSidebarContext from '@/hooks/useSidebarContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
const SidebarLink = dynamic(() => import('./SidebarLink'), { ssr: false });

const Sidebar = () => {
  const { sidebarLinks } = useSidebarContext();
  const router = useRouter();
  // Get current page height to set sidebar height
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    // Get current page height with window.innerHeight
    setHeight(Number(document.documentElement.clientHeight));
  }, [document.documentElement.clientHeight]);



  return (
    <div
      className={`bg-light-dark-2 w-16  rounded-md px-2 py-3 transition-all duration-500 
    ${
      height > 0
        ? `${'h-[' + document.documentElement.clientHeight + 'px]'}`
        : 'h-screen'
    }
    min-h-max sm:w-20 sm:px-3 md:w-40  md:px-5 lg:px-7 lg:min-w-[200px] lg:w-52`}
    >
      <div className="h-full flex flex-col items-center">
        {sidebarLinks.map((link, index) => (
          <SidebarLink {...link} index={index} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
