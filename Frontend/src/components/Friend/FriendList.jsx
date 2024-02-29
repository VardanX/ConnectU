import { Link } from "react-router-dom";
import { useGetAllFriendsQuery } from "../../features/friend/friendApiSlice";
import useFriend from "../../hooks/useFriend";
import IconButton from "../Button/IconButton";
import LoadingIndicator from "../Indicator/LoadingIndicator";
import { UilUserMinus } from "@iconscout/react-unicons";

export default function FriendList({ type }) {
  const { isLoading, isError, data: friends } = useGetAllFriendsQuery();
  const { handleRemoveFriend } = useFriend();
  return (
    <div className=" w-full bg-white px-5 py-4 rounded-md shadow-md max-h-max h-fit dark:bg-darkBg">
      <div className="">
        <h2 className="text-lg font-semibold text-gray-500 pb-4 dark:text-white">
          Friend Lists
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
            friends?.friends?.map((friend, index) => (
              <li key={index} className="flex items-center justify-between ">
                <div className="flex items-center gap-x-4">
                  <img
                    src={friend.picturePath}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <Link
                    to={`profile/${friend._id}`}
                    className="text-sm font-medium text-gray-800 duration-200 hover:text-blue-700 dark:text-white dark:hover:text-slate-300
              "
                  >
                    {friend.firstName} {friend.lastName}
                  </Link>
                </div>
                <IconButton
                  icon={<UilUserMinus />}
                  onClick={() => handleRemoveFriend(friend._id)}
                />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
