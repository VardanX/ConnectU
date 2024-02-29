import ReactDOM from "react-dom";
import IconButton from "../Button/IconButton";
import { UilTimes } from "@iconscout/react-unicons";

export default function Modal({ isOpen, children, handleModal, title }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-modalBg flex justify-center items-center z-10 dark:bg-slate-500/75">
      <div className="bg-white rounded-md drop-shadow-md w-full mx-2 p-4 sm:max-w-md dark:bg-darkBg">
        <div className="flex items-center justify-between">
          <h1 className="text-gray-700 text-xl font-medium dark:text-white">
            {title}
          </h1>
          <IconButton icon={<UilTimes />} onClick={handleModal} />
        </div>
        <hr className="my-4" />
        {children}
      </div>
    </div>,
    document.getElementById("portal")
  );
}
