export default function SecondaryButton({ name, onClick }) {
  return (
    <button
      onClick={onClick}
      className="py-2 px-4 rounded-md w-full my-1 duration-300 text-red-700 bg-red-100  hover:bg-red-200"
    >
      {name}
    </button>
  );
}
