export default function TextIconButton({ icon, name, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-x-1 duration-200 hover:bg-blue-100 px-6 py-1.5 rounded-md dark:hover:bg-darkLightBg"
    >
      {icon} {name}
    </button>
  );
}
