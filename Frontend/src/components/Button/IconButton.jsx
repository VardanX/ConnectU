export default function IconButton({ icon, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative p-2 rounded-full duration-300 text-blue-700 bg-blue-100  hover:bg-blue-200 dark:bg-darkLightBg dark:hover:bg-slate-600 dark:text-slate-200 dark:hover:text-slate-300"
    >
      {icon}
      {children}
    </button>
  );
}
