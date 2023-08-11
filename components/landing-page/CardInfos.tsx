import dynamic from 'next/dynamic'
const Image = dynamic(() => import('next/image'))

type Props = {
  card: {
    icon: string
    title: string
    description: string
  }
}

const CardInfos = ({ card }: Props) => {
  return (
    <div className='w-full mx-auto flex flex-col items-start justify-evenly text-center md:w-11/12'>
      <Image
        src={'/images/svg/' + card.icon}
        alt={card.title}
        width={50}
        height={50}
        className='p-4 bg-light-dark-3 rounded-md object-contain'
      />
      <h3 className='font-semibold mt-6'>{card.title}</h3>
      <p className='text-left text-sm font-light'>{card.description}</p>
    </div>
  )
}

export default CardInfos
