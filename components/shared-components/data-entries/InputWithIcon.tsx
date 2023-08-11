import dynamic from 'next/dynamic';
import { ChangeEvent, FocusEvent, ReactNode } from 'react';
const OutlinedInput = dynamic(() => import('@mui/material/OutlinedInput'));

type Props = {
  // required fields
  type: string;
  name: string;
  placeholder: string;
  // optional fields
  value?: string;
  className?: string;
  iconClassName?: string;
  inputClasses?: string;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
  error?: boolean | string | undefined;
  required?: boolean;
  isPassword?: boolean;
  autoFocus?: boolean;
  rows?: number;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  autoComplete?: string;
};

const InputWithIcon = ({
  type,
  name,
  onChange,
  placeholder,
  required = true,
  error = false,

  autoComplete = '',
  ...props
}: Props) => {
  return (
    <div
      className={`relative flex items-center m-auto rounded-md transition-all duration-300 ${props.className} `}
    >
      <OutlinedInput
        type={type}
        name={name}
        value={props.value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`outline-none w-full px-1 rounded-md  text-white !text-xs text-left flex-1 h-full ${
          props.inputClasses
        } lg:!text-base md:!text-sm md:px-2 ${error && 'border-2 border-red-600'}`}
        onChange={onChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        autoFocus={props.autoFocus}
        rows={props.rows}
        sx={{
          width: '100%',
          textAlign: 'left',
          color: 'white',
          // height: "50px",
          '& fieldset': {
            border: 'none',
          },
        }}
        endAdornment={props.endAdornment}
        inputProps={{ style: { textAlign: 'left' } }}
        // onFocus: date, onBlur: text
      />
      {!required && <span className="text-blue-text ml-1">optional</span>}
      <p>
        {error && (
          <small className="text-red-500 text-right w-full absolute right-2 top-full pb-4">
            {error}
          </small>
        )}
      </p>
    </div>
  );
};

export default InputWithIcon;
