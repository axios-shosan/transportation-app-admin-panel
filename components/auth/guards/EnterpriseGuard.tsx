import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useMyEnterpriseMutation } from '@/redux/api/apiSlice';
import LoadingSpinner from '@/components/shared-components/LoadingSpinner';
import LoadingPage from '@/components/shared-components/LoadingPage';
import { toast } from 'react-toastify';

export default function EnterpriseGuard({ children }: any) {
  const router = useRouter();
  const effectRan = useRef(false);
  const [myEnterprise, { isLoading, isSuccess, isError }] =
    useMyEnterpriseMutation();
  const [hasEnterp, setHasEnterp] = useState(false);

  useEffect(() => {
    if (effectRan.current === false) {
      myEnterprise(null)
        .unwrap()
        .then((res) => {
          setHasEnterp(true);
        })
        .catch((err) => {
          setHasEnterp(false);
          console.error(err);
          toast.error(err.data.message);
        });
      return () => {
        effectRan.current = true;
      };
    }
  }, []);

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

  if (isLoading) {
    return <LoadingPage />;
  }

  // If user has Enterprise
  if (isSuccess && !isLoading && hasEnterp) {
    // If he is requesting the page  create Enterprise, we send him to the page ge requested previously
    if (router.pathname === '/dashboard/enterprise/create') {
      if (typeof window !== 'undefined') {
        if (window.history.length > 0) router.back();
        else router.push('/');
      }
      return null;
    }

    // If he is requesting another page than create Enterprise page, we let him pass
    else {
      return children;
      // check if component has mounted
    }
  }
  // If user doesn't have enterprise
  else if (!isSuccess && isError && !isLoading && !hasEnterp) {
    if (
      router.pathname === '/dashboard/enterprise/create' ||
      router.pathname === '/login' ||
      router.pathname === '/register' ||
      router.pathname === '/_error' ||
      router.pathname === '/'
    ) {
      return children;
    }
    // If he is requesting any other page
    else {
      // check if component has mounted
      if (typeof window !== 'undefined') {
        router.push('/dashboard/enterprise/create');
      }

      return null;
    }
  }

  return <LoadingSpinner />;
}
