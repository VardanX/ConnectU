import { Link } from "react-router-dom";
import LoadingIndicator from "../Indicator/LoadingIndicator";
import IconButton from "../Button/IconButton";
import useFriend from "../../hooks/useFriend";
import { UilUserPlus } from "@iconscout/react-unicons";
import { useGetPeopleYouMayKnowQuery } from "../../features/user/userApiSlice";

export default function PeopleYouMayKnow() {
  const { handleAddFriend } = useFriend();
  const { isLoading, isError, data: users } = useGetPeopleYouMayKnowQuery();
  return (
    <div className=" w-full bg-white px-5 py-4 rounded-md shadow-md max-h-max h-fit dark:bg-darkBg">
      <div className="">
        <h2 className="text-lg capitalize font-semibold text-gray-500 pb-4 dark:text-white">
          people you may know
        </h2>
        <hr className="my-2" />
        <ul className="flex flex-col gap-y-3">
          {isLoading ? (
            <LoadingIndicator />
          ) : isError ? (
            <h1 className="mt-6 text-center text-gray-500 dark:text-white font-semibold text-base">
              Friend List Empty
            </h1>
          ) : (
            users?.users?.map((user, index) => (
              <li key={index} className="flex items-center justify-between ">
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
                    {user.firstName} {user.lastName}
                  </Link>
                </div>
                <IconButton
                  icon={<UilUserPlus />}
                  onClick={() => handleAddFriend(user._id)}
                />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
