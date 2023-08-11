import dynamic from 'next/dynamic'
import LoadingSpinner from '@/components/shared-components/LoadingSpinner'
const Map = dynamic(() => import('@/components/map/Map'), {
  ssr: false, // this is important to prevent the page from flashing on load
  loading: () => <LoadingSpinner />,
})

const MapPage = () => {
  // return a loading spinner if the page is not loaded yet
  if (typeof window == 'undefined') return <LoadingSpinner />

  return (
    <>
      <Map />
    </>
  )
}

export default MapPage
