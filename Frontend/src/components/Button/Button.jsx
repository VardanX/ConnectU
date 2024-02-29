export default function Button({ name, onClick }) {
  return (
    <button
      className="text-[12px] text-gray-600 dark:text-gray-300 capitalize font-medium hover:underline"
      onClick={onClick}
    >
      {name}
    </button>
  );
}
