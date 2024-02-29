import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentUser } from "../features/auth/authSlice";
import {
  UilMapMarker,
  UilBriefcase,
  UilEnvelopeMinus,
} from "@iconscout/react-unicons";

export default function ProfileCard({ user }) {
  const userId = useSelector(currentUser);
  const {
    firstName,
    lastName,
    email,
    picturePath,
    occupation,
    address,
    friends,
  } = user;

  return (
    <div className="bg-white px-5 py-8 mt-24 rounded-md shadow-md w-1/4 max-h-max h-1/2 hidden lg:block dark:bg-darkBg ">
      <div className="flex flex-col items-center">
        <img
          src={picturePath}
          alt="profile-image"
          className="w-16 h-16 rounded-md object-cover border-4 dark:border-darkLightBg"
        />
        <Link
          to={`profile/${userId}`}
          className="text-xl text-gray-800 font-bold pt-3 duration-200 hover:text-blue-700 dark:text-white dark:hover:text-gray-300"
        >
          {firstName} {lastName}
        </Link>
        <p className="text-sm text-gray-500 font-medium dark:text-white">
          {" "}
          {friends.length} friends
        </p>
      </div>
      <hr className="my-4" />
      <ul className="text-blue-700 dark:text-gray-200 ">
        <li className="inline-flex items-center gap-x-2">
          <UilMapMarker />
          <span className="text-gray-500 capitalize dark:text-slate-300">
            {address}
          </span>
        </li>
        <li className="inline-flex items-center gap-x-2 pl-4">
          <UilBriefcase />
          <span className="text-gray-500 capitalize dark:text-slate-300">
            {occupation}
          </span>
        </li>
        <li className="inline-flex items-center gap-x-2">
          <UilEnvelopeMinus />{" "}
          <span className="text-gray-500 dark:text-slate-300">{email}</span>
        </li>
      </ul>
    </div>
  );
}
