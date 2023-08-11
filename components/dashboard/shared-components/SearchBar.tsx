import { Offer } from '@/interfaces/offer';
import { Shipment } from '@/interfaces/shipment';
import { Vehicle } from '@/interfaces/vehicle';
import { OutlinedInput, Autocomplete, TextField } from '@mui/material';
import { useTranslation } from 'next-i18next';
type Props = {
  rows?: Vehicle[] | Shipment[] | Offer[] | any[];
  handleSearch;
};

const SearchBar = ({ rows, handleSearch }: Props) => {
  const {t} = useTranslation(['common']);
  return (
    <div className="flex items-center w-3/5 relative sm:w-60 md:w-64">
      <OutlinedInput
        type="text"
        name="search"
        placeholder={t('seach-placeholder')}
        className="bg-light-dark-2 my-3 border-none outline-none w-full px-2 rounded-md  !text-white text-sm text-left flex-1 h-10 lg:text-md lg:h-12 lg:px-3 md:h-11"
        sx={{
          width: '100%',
          textAlign: 'left',
          '& fieldset': {
            border: 'none',
          },
        }}
        inputProps={{ style: { textAlign: 'left' } }}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
