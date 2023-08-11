import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState, ReactNode, createContext, useEffect } from 'react';
const DashboardIcon = dynamic(
  () =>
    import('@/components/icons/sidebarIcons').then((mod) => mod.DashboardIcon),
  { ssr: false }
);
const VehicleIcon = dynamic(() =>
  import('@/components/icons/sidebarIcons').then((mod) => mod.VehicleIcon)
);
const DeliveryIcon = dynamic(() =>
  import('@/components/icons/sidebarIcons').then((mod) => mod.DeliveryIcon)
);

type SidebarLink = {
  title: string;
  Icon: ReactNode;
  href?: string;
};

type SidebarContext = {
  sidebarToggle: boolean;
  sidebarLinks: SidebarLink[];
  selectedLink: number;
  setSelectedLink: (link: number) => void;
  setSidebarLinks: (links: {}) => void;
  toggleSidebar: () => void;
  closeSidebar: () => void;
};

const SidebarContext = createContext<SidebarContext>({
  sidebarToggle: false,
  sidebarLinks: [],
  selectedLink: 0,
  setSelectedLink: () => {},
  setSidebarLinks: () => {},
  toggleSidebar: () => {},
  closeSidebar: () => {},
} as SidebarContext);

type Props = {
  children: ReactNode;
};

export function SidebarProvider({ children }: Props) {
  const router = useRouter();
  const { locale } = router;
  const { data: session, status } = useSession();
  const [sidebarToggle, setSidebarToggle] = useState<boolean>(false);
  const [sidebarLinks, setSidebarLinks] = useState([]);
  const [selectedLink, setSelectedLink] = useState(0);
  const { t } = useTranslation('sidebar');

  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  const closeSidebar = () => {
    setSidebarToggle(false);
  };

  // set selected link based on current path
  useEffect(() => {
    const currentPath = router.pathname;

    // chack if the current path is in the sidebar links
    const currentLink = sidebarLinks
      .slice(1)
      .findIndex((link) => currentPath.includes(link.href));

    // if no link is selected we select the dashboard
    if (currentLink === -1) {
      setSelectedLink(0);
      return;
    } else setSelectedLink(currentLink + 1);
  }, [router, sidebarLinks]);

  // filter sidebar links based on user role
  // carrier: vehicles, bids, marketplace and shipments
  // shipper: shipments and offers
  // admin: all
  useEffect(() => {
    if (status === 'loading') return;
    if (
      (session?.user?.carrier === 1 && session?.user?.shipper === 1) ||
      !session
    ) {
      setSidebarLinks([
        {
          title: t('dashboard'),
          Icon: DashboardIcon,
          href: '/dashboard',
        },
        {
          title: t('shipments'),
          Icon: DeliveryIcon,
          href: '/dashboard/shipments',
        },
        {
          title: t('offer'),
          Icon: DeliveryIcon,
          href: '/dashboard/offers',
        },
        {
          title: t('vehicles'),
          Icon: VehicleIcon,
          href: '/dashboard/vehicles',
        },
        {
          title: t('marketplace'),
          Icon: DeliveryIcon,
          href: '/dashboard/marketplace',
        },
        {
          title: t('transporters'),
          Icon: DeliveryIcon,
          href: '/dashboard/transporters',
        },
      ]);
    } else if (session?.user?.shipper === 1) {
      setSidebarLinks([
        {
          title: t('dashboard'),
          Icon: DashboardIcon,
          href: '/dashboard',
        },
        {
          title: t('shipments'),
          Icon: DeliveryIcon,
          href: '/dashboard/shipments',
        },
        {
          title: t('offer'),
          Icon: DeliveryIcon,
          href: '/dashboard/offers',
        },
      ]);
    } else if (session?.user?.carrier === 1) {
      setSidebarLinks([
        {
          title: t('dashboard'),
          Icon: DashboardIcon,
          href: '/dashboard',
        },
        {
          title: t('shipments'),
          Icon: DeliveryIcon,
          href: '/dashboard/shipments',
        },
        {
          title: t('vehicles'),
          Icon: VehicleIcon,
          href: '/dashboard/vehicles',
        },
        {
          title: t('marketplace'),
          Icon: DeliveryIcon,
          href: '/dashboard/marketplace',
        },
        {
          title: t('transporters'),
          Icon: DeliveryIcon,
          href: '/dashboard/transporters',
        },
      ]);
    }
  }, [session, locale]);

  return (
    <SidebarContext.Provider
      value={{
        sidebarToggle,
        sidebarLinks,
        setSidebarLinks,
        selectedLink,
        setSelectedLink,
        toggleSidebar,
        closeSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export default SidebarContext;
