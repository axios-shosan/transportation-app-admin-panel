import { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import LoadingPage from '@/components/shared-components/LoadingPage';
const Navbar = dynamic(() => import('@/components/shared-components/Navbar'));
const Footer = dynamic(() => import('@/components/shared-components/Footer'));

type Props = {
  children?: ReactNode;
  title?: string;
  noNavbar?: boolean;
  noFooter?: boolean;
};

const BaseLayout = ({
  children,
  title = 'Cafila',
  noNavbar = false,
  noFooter = false,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const onPageLoad = () => {
      setLoading(false);
    };

    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, [document]);

  if (loading) return <LoadingPage />;

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
          href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,300;1,500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="relative min-h-screen w-screen bg-dark text-white">
        {!noNavbar && <Navbar />}

        {/* Page Content */}
        <main className="w-full">{children}</main>

        {!noFooter && <Footer />}
      </div>
    </>
  );
};

export default BaseLayout;
