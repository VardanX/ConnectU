export default function SecondarySubmitButton({ value }) {
  return (
    <input
      type="submit"
      value={value}
      className="bg-blue-600 text-[10px] text-white font-medium px-2 py-1 rounded-sm duration-300 cursor-pointer capitalize hover:bg-blue-700 border-none"
    />
  );
}
