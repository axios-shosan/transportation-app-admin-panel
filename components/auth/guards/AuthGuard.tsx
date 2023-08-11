import dynamic from 'next/dynamic';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoadingPage from '@/components/shared-components/LoadingPage';

function AuthGuard({ children }: any) {
  let { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      const { error } = session as any;
      if (error === 'RefreshAccessTokenError') {
        signOut();
        return;
      }
    }
  }, [session]);

  if (status === 'loading') {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-blue ">
        <h1 className="text-center text-3xl text-white">
          <LoadingPage />
        </h1>
      </div>
    );
  }

  // If user is authenticated
  if (session) {
    // If he is requesting a page other than login or register page
    if (router.pathname !== '/login' && router.pathname !== '/register') {
      return children;
    }

    // If he is requesting login or register page
    else {
      // check if component has mounted
      if (typeof window !== 'undefined') {
        router.push('/dashboard');
      }
      return null;
    }
  }

  // If user is not authenticated
  else if (!session) {
    // If he is requesting landing, login, or register page
    if (
      router.pathname === '/login' ||
      router.pathname === '/register' ||
      router.pathname === '/register/finish-setting-up-entreprise' ||
      router.pathname === '/contact' ||
      router.pathname === '/about' ||
      router.pathname === '/_error' ||
      router.pathname === '/'
    ) {
      return children;
    }

    // If he is requesting any other page
    else {
      // check if component has mounted
      if (typeof window !== 'undefined') {
        router.push('/login');
      }
      return null;
    }
  }
}

export default AuthGuard;
