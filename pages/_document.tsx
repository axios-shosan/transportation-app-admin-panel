import LoadingPage from '@/components/shared-components/LoadingPage';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <LoadingPage />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
