export const TextAreaInput = ({
  name,
  placeholder,
  register,
  rows = 2,
  onKeyDown = null,
}) => {
  return (
    <textarea
      {...register(name)}
      rows={rows}
      defaultValue=""
      className="resize-none h-auto rounded-md outline-none bg-gray-100 px-6 py-3 w-full scrollbar dark:bg-darkLightBg dark:text-white"
      placeholder={placeholder}
      onKeyDown={onKeyDown}
    />
  );
};
