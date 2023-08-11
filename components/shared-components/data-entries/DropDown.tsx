import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import 'dayjs/locale/fr';
import { useTranslation } from 'next-i18next';

type Props = {
  name: string;
  value: number | string;
  formik: any;
  options: {
    label: string;
    value: number | string;
  }[];
  placeholder?: string;
  error?: string;
  className?: string;
  width?: string;
  translationFile: string;
};

const DropDown = ({
  name,
  placeholder,
  options,
  formik,
  translationFile,
  ...props
}: Props) => {
  const { t } = useTranslation(translationFile);
  return (
    <>
      <Select
        name={name}
        onChange={formik.handleChange}
        value={formik.values[name]}
        displayEmpty
        renderValue={(selected) => {
          if (selected !== 0 && (!selected || selected?.length === 0)) {
            return (
              <p className="text-xs text-gray-400 px-1 lg:px-2 lg:text-base md:text-sm">
                {t(placeholder)}
              </p>
            );
          } else {
            return (
              <p className="text-xs text-white px-3 lg:text-base md:text-sm">
                {t(options.find((option) => option.value === selected)?.label)}
              </p>
            );
          }
        }}
        className={`font-medium relative flex items-center m-auto bg-light-dark-3 h-10  mb-5 rounded-md border-none outline-none transition-all duration-300 md:h-12 lg:h-14 md:mb-8 ${props.className}`}
        // remove select blue border
        sx={{
          // width: props.width || '100%',
          textAlign: 'left',
          marginLeft: 0,
          marginRight: 0,
          color: 'white',
          '& fieldset': {
            border: 'none',
          },
          // change the left down arrow color
          '& svg': {
            color: '#282828',
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value} className="font-medium">
            {t(option.label)}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default DropDown;
