export default function SubmitButton({ value, fullWidth = null }) {
  return (
    <input
      type="submit"
      value={value}
      className={`${
        fullWidth ? "w-full" : ""
      } bg-blue-600 text-white px-6 py-2 rounded-md duration-300 cursor-pointer hover:bg-blue-700 border-none`}
    />
  );
}
