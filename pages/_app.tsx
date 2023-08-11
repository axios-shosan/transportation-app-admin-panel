import '@/styles/globals.css';
import '@/styles/iconsStyles.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { store } from '../redux/store';
import { NextPage } from 'next';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { AuthSession } from '../interfaces/auth';
import { appWithTranslation } from 'next-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SessionProvider = dynamic(
  () => import('next-auth/react').then((mod) => mod.SessionProvider),
  {
    ssr: false, // this is important to prevent the page from flashing on load
  }
);
const Provider = dynamic(
  () => import('react-redux').then((mod) => mod.Provider),
  {
    ssr: false, // this is important to prevent the page from flashing on load
  }
);

const EnterpriseGuard = dynamic(
  () => import('@/components/auth/guards/EnterpriseGuard')
);

const AuthGuard = dynamic(() => import('@/components/auth/guards/AuthGuard'), {
  ssr: false, // this is important to prevent the page from flashing on load
});

// Mui FR translations
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { frFR } from '@mui/x-data-grid';
import { frFR as corefrFR } from '@mui/material/locale';
import LoadingPage from '@/components/shared-components/LoadingPage';
import { useRouter } from 'next/router';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
    //direction: 'rtl',
  },
  frFR, // x-data-grid translations
  corefrFR // core translations
);

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface CafilaAppProps extends AppProps {
  //emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
  session: AuthSession;
}

function CafilaApp(props: CafilaAppProps) {
  const { Component, pageProps, session } = props;
  const getLayout = Component.getLayout || ((page) => page);

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url) => {
      if (url === router.asPath) setLoading(true);
    };
    const handleComplete = (url) => {
      if (url === router.asPath) setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  if (loading) return <LoadingPage />;

  return (
    <SessionProvider session={session} refetchInterval={14 * 60}>
      <Provider store={store}>
        <AuthGuard>
          {/* <EnterpriseGuard> */}
          <ThemeProvider theme={theme}>
            {getLayout(<Component {...pageProps} />)}
            <ToastContainer
              position="top-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </ThemeProvider>
          {/* </EnterpriseGuard> */}
        </AuthGuard>
      </Provider>
    </SessionProvider>
  );
}

export default appWithTranslation(CafilaApp);
