import { useEffect } from "react";
import SubmitButton from "../Button/SubmitButton";

export default function SearchBox({
  handleSubmit,
  onSubmit,
  register,
  setFocus,
}) {
  useEffect(() => {
    setFocus("search");
  }, [setFocus]);

  return (
    <form className="flex space-x-4 py-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register("search")}
        placeholder="Search people and Friends"
        className="bg-gray-100 px-6 py-2 rounded-md outline-none text-gray-500 dark:bg-darkLightBg dark:text-white"
      />
      <SubmitButton value="Search" />
    </form>
  );
}
