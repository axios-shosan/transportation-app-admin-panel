// translate all error fields to custom props
type Props = {
  name: string;
  placeholder: string;
  formik: any;
};
const DateTime = ({ name, placeholder, formik }: Props) => {
  return (
    <>
      <input
        type={'text'}
        name={name}
        value={formik.values[name]}
        placeholder={placeholder}
        className={`relative font-normal bg-light-dark-3 outline-none w-full px-4 rounded-md  text-white text-left flex-1 h-10 md:h-12 lg:h-14 placeholder-gray-400 text-xs md:text-sm lg:text-base ${
          formik.errors[name] &&
          formik.touched[name] &&
          'border-2 border-red-600'
        }`}
        // close on select time
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        // change type to date on focus
        onFocus={(e) => {
          e.target.type = 'datetime-local';
          //open calendar
          e.target.value = new Date().toISOString().slice(0, 16);
        }}
      />
      <p>
        {formik.errors[name] && formik.touched[name] && (
          <small className="text-red-500 text-right w-full absolute top-12 right-2 pb-4">
            {formik.errors[name] && formik.touched[name] && formik.errors[name]}
          </small>
        )}
      </p>
    </>
  );
};

export default DateTime;
