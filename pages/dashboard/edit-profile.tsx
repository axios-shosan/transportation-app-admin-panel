import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/shared-components/LoadingSpinner';
const EditProfileForm = dynamic(
  () => import('@/components/dashboard/profile/EditProfileForm'),
  { ssr: false }
);
import SidebarLayout from '@/layouts/SidebarLayout';

const EditProfilePage = () => {
  // return a loading spinner if the page is not loaded yet
  if (typeof window == 'undefined') return <LoadingSpinner />;

  return <EditProfileForm />;
};

export default EditProfilePage;

EditProfilePage.getLayout = (page) => (
  <SidebarLayout title="Modifier Profile | Cafila" noFooter noSidebar>
    {page}
  </SidebarLayout>
);
