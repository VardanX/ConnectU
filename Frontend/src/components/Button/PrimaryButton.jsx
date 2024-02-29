export default function PrimaryButton({ name, onClick }) {
  return (
    <button
      onClick={onClick}
      className="py-2 px-4 rounded-md w-full my-1 duration-300 text-blue-700 bg-blue-100  hover:bg-blue-200"
    >
      {name}
    </button>
  );
}
