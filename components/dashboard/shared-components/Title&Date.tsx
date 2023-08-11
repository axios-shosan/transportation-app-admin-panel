import { useRouter } from 'next/router';
import SearchBar from './SearchBar';

type Props = {
  title: string;
  noSearch?: boolean;
  handleSearch?: (search: string) => void;
};

const TitleAndDate = ({ title, noSearch = false, handleSearch }: Props) => {
  const router = useRouter();
  const { locale } = router;

  return (
    <section className="mb-4 w-full flex flex-col items-start justify-between sm:flex-row sm:items-center">
      <div>
        <h3 className="text-2xl font-medium md:text-2xl lg:text-3xl">
          {title}
        </h3>
        <p className="text-light-dark-4 text-xs font-normal capitalize lg:text-sm">
          {new Date().toLocaleDateString(locale, {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
      {!noSearch && <SearchBar handleSearch={handleSearch} />}
    </section>
  );
};

export default TitleAndDate;
