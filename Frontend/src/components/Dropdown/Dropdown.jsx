import { useRef } from "react";
import IconButton from "../Button/IconButton";

const clickOutsideRef = (content_ref, toggle_ref) => {
  document.addEventListener("mousedown", (e) => {
    // user click toggle
    if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
      content_ref.current.classList.toggle("active");
    } else {
      // user click outside toggle and content
      if (content_ref.current && !content_ref.current.contains(e.target)) {
        content_ref.current.classList.remove("active");
      }
    }
  });
};

export default function Dropdown({
  customToggle,
  contentData,
  renderItems,
  customButton,
  onClick,
}) {
  const dropdown_toggle_el = useRef(null);
  const dropdown_content_el = useRef(null);

  clickOutsideRef(dropdown_content_el, dropdown_toggle_el);
  return (
    <div className="relative">
      <div
        className="dropdown__toggle relative cursor-pointer"
        ref={dropdown_toggle_el}
      >
        {customToggle ? customToggle() : ""}
      </div>
      <div
        className="dropdown__content absolute right-0 bg-white w-max drop-shadow-2xl rounded-md origin-top-right px-3 py-4 dark:bg-darkBg"
        ref={dropdown_content_el}
      >
        <ul>
          {contentData?.length && renderItems ? (
            contentData.map((item, index) => renderItems(item, index))
          ) : (
            <h4 className="text-gray-500 text-sm font-medium">No items</h4>
          )}
          {customButton && onClick && (
            <div
              onClick={onClick}
              className=" cursor-pointer text-gray-500 font-medium flex items-center gap-8 rounded-md px-5 py-1 tracking-normal duration-200 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-darkLightBg dark:text-white"
            >
              <IconButton icon={customButton.icon} />
              <span>{customButton.name}</span>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
