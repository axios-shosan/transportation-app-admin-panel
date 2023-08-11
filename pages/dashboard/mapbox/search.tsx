import LoadingSpinner from '@/components/shared-components/LoadingSpinner';
import SidebarLayout from '@/layouts/SidebarLayout';
import dynamic from 'next/dynamic';
import React from 'react';
const AutofillAdress = dynamic(
  () => import('@/components/shared-components/AutofillAdress'),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  }
);

export default function SearchMapbox() {
  return (
    <div>
      <AutofillAdress />
    </div>
  );
}

SearchMapbox.getLayout = (page) => (
  <SidebarLayout title="Mapbox Searh | Cafila" noFooter>
    {page}
  </SidebarLayout>
);
