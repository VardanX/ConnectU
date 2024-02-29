import { useState } from "react";
import SearchBox from "../Form/SearchBox";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { useGetAllUserQuery } from "../../features/user/userApiSlice";
import LoadingIndicator from "../Indicator/LoadingIndicator";
import { Link } from "react-router-dom";

export default function SearchModal({ modal, handleModal }) {
  const [searchData, setSearchData] = useState("");
  const { handleSubmit, register, setFocus } = useForm();
  const {
    isLoading,
    isError,
    data: users,
  } = useGetAllUserQuery(searchData, { skip: searchData === "" });

  const handleSearch = ({ search }) => {
    setSearchData(search);
  };
  return (
    <Modal isOpen={modal.isOpen} handleModal={handleModal} title="Search">
      <SearchBox
        handleSubmit={handleSubmit}
        onSubmit={handleSearch}
        register={register}
        setFocus={setFocus}
      />
      <div className="h-auto overflow-auto scrollbar">
        {isLoading ? (
          <LoadingIndicator />
        ) : isError ? (
          <h4 className="text-gray-500 font-semibold text-xl text-center dark:text-white">
            User Not Found
          </h4>
        ) : (
          <ul className="flex flex-col gap-y-3">
            {users?.users.map((user, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-gray-500 font-medium  gap-8 rounded-md px-5 py-1 tracking-normal duration-200 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-darkLightBg dark:text-white"
              >
                <div className="flex items-center gap-x-4">
                  <img
                    src={user.picturePath}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <Link
                    to={`profile/${user._id}`}
                    className="text-sm font-medium text-gray-800 duration-200 hover:text-blue-700 dark:text-white dark:hover:text-slate-300
                  "
                  >
                    <h1 onClick={() => handleModal()}>
                      {user.firstName} {user.lastName}
                    </h1>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
}
