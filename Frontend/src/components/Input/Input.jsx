import InputErrorMessage from "./InputErrorMessage";

export default function Input({
  label,
  type,
  name,
  placeholder,
  register,
  errors,
  pattern = null,
}) {
  return (
    <div className="md:flex flex-col dark:text-white">
      <div>
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          className={`outline-none w-full  text-gray-500 border-2 rounded-md px-4 py-2 duration-200 focus:border-blue-600  ${
            errors.hasOwnProperty(`${name}`) && "border-red-500"
          } `}
          {...register(name, {
            required: `${label} is required`,
            pattern,
          })}
          placeholder={placeholder}
        />
      </div>
      <InputErrorMessage name={name} errors={errors} />
    </div>
  );
}
