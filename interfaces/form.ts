export type InputProps = {
  name: string;
  type: string;
  placeholder: string;
  component: "text" | "drop-down" | "date";
  className?: string;
  inputClasses?: string;
  options?: { value: string | number; label: string }[];
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  type?: string;
  className?: string;
};

export type FormProps = {
  formClassName?: string;
  inputs: InputProps[];
  buttons: ButtonProps[];
  buttonsContainerClassName?: string;
};
