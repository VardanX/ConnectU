import InputErrorMessage from "./InputErrorMessage";

export const FileInput = ({ name, register, errors }) => {
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        {...register(name, {
          required: `${name} is required`,
        })}
        className="block w-full text-sm text-gray-500
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-full file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-100 file:text-blue-700
                 hover:file:bg-blue-200 file:cursor-pointer
                 dark:file:bg-darkLightBg
                 dark:file:text-white
                 "
      />
      <InputErrorMessage errors={errors} name={name} />
    </div>
  );
};
