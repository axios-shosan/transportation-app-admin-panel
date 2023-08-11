import { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
const SidebarProvider = dynamic(
  () => import('../context/SidebarContext').then((mod) => mod.SidebarProvider),
  { ssr: false }
);
const Navbar = dynamic(
  () => import('@/components/dashboard/shared-components/Navbar')
);
const Sidebar = dynamic(() => import('@/components/shared-components/Sidebar'));
const Footer = dynamic(() => import('@/components/shared-components/Footer'));

type Props = {
  children?: ReactNode;
  title?: string;
  noNavbar?: boolean;
  noFooter?: boolean;
  noSidebar?: boolean;
};

const SidebarLayout = ({
  children,
  title = 'Cafila',
  noNavbar = false,
  noFooter = false,
  noSidebar = false,
}: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,700;1,500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,500;1,500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,400;1,500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=c:ital,wght@0,100;0,300;1,500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="relative max-w-screen bg-dark text-white flex items-center justify-center flex-col h-full">
        {!noNavbar && <Navbar />}
        <div className="my-4 w-[95%] mx-auto flex items-start justify-evenly relative">
          {/* Sidebar */}
          {!noSidebar && (
            <SidebarProvider>
              <Sidebar />
            </SidebarProvider>
          )}

          {/* Page Content */}
          <main className="flex-1 pl-8">{children}</main>
        </div>
        {!noFooter && <Footer />}
      </div>
    </>
  );
};

export default SidebarLayout;
