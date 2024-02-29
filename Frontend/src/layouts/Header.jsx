import { useEffect } from "react";
import { socket } from "../socket";
import { Link, NavLink } from "react-router-dom";
import IconButton from "../components/Button/IconButton";
import Dropdown from "../components/Dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../features/auth/authSlice";
import useLogout from "../hooks/useLogout";
import useModal from "../hooks/useModal";
import SearchModal from "../components/Modal/SearchModal";
import {
  UilCreateDashboard,
  UilEstate,
  UilEnvelopeCheck,
  UilBell,
  UilAngleDown,
  UilUser,
  UilSetting,
  UilSignOutAlt,
  UilBrightness,
  UilUsersAlt,
} from "@iconscout/react-unicons";
import {
  notification,
  removeNotification,
  setNotification,
} from "../features/Notification/notificationSlice";

export default function Header({ picturePath }) {
  const { handleLogout } = useLogout();
  const { modal, handleModal } = useModal();
  const userId = useSelector(currentUser);
  const notifications = useSelector(notification);
  const dispatch = useDispatch();

  const toggleUserMenuList = [
    {
      name: "Profile",
      link: `/profile/${userId}`,
      icon: <UilUser />,
    },
    {
      name: "Settings",
      link: "/settings",
      icon: <UilSetting />,
    },
  ];

  const mobileNavigationList = [
    {
      link: "/",
      icon: <UilEstate />,
    },
    {
      link: "/friends",
      icon: <UilUsersAlt />,
    },
    {
      link: `/profile/${userId}`,
      icon: <UilUser />,
    },
    {
      link: "/notifications",
      icon: <UilBell />,
    },

    {
      link: "/settings",
      icon: <UilSetting />,
    },
  ];

  const renderUserToggle = () => (
    <>
      <img
        src={picturePath}
        alt=""
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="bg-gray-100 duration-200 text-blue-700 hover:bg-gray-200 absolute left-7 flex items-center justify-center w-4 h-4 bottom-0 rounded-full">
        <UilAngleDown />
      </div>
    </>
  );

  const renderUserMenu = (item, index) => (
    <li className="py-1" key={index}>
      <Link
        to={item.link}
        className=" text-gray-500 font-medium flex items-center gap-8 rounded-md px-5 py-1 tracking-normal duration-200 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-darkLightBg dark:text-white"
      >
        <IconButton icon={item.icon} />
        <span>{item.name}</span>
      </Link>
    </li>
  );

  const renderNotificationToggle = () => (
    <IconButton icon={<UilBell />}>
      {notifications?.notification?.length > 0 ? (
        <div className="absolute top-0 right-0">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-500"></span>
          </span>
        </div>
      ) : (
        ""
      )}
    </IconButton>
  );

  const renderNotificationMenu = (item, index) => (
    <li className="py-1" key={index}>
      <Link
        to={`/profile/${item.currentUserId}`}
        className="text-gray-500 font-medium flex items-center gap-8 rounded-md px-5 py-1 tracking-normal duration-200 hover:bg-blue-50 dark:hover:bg-darkLightBg dark:text-white"
      >
        <h4 className="py-1" onClick={() => dispatch(removeNotification())}>
          <span className="text-gray-700">{item.currentuserName}</span> likes
          your post
        </h4>
      </Link>
    </li>
  );

  const handleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    const dispatchNotification = (socketId) => {
      dispatch(setNotification(socketId));
    };
    socket.on("getNotification", dispatchNotification);
    return () => {
      socket.off("getNotification", dispatchNotification);
    };
  }, [socket]);

  return (
    <>
      {/* Desktop Navbar */}
      <div className="py-6 bg-white shadow-sm fixed top-0 right-0 left-0 dark:bg-darkBg z-10">
        <header className="flex justify-between items-center container mx-auto px-9 lg:px-14">
          <div className="inline-flex items-center gap-x-2 ">
            <UilCreateDashboard className="text-blue-700 dark:text-white " />
            <span className=" text-3xl font-bold tracking-wide text-gray-800 dark:text-white">
              ConnectU
            </span>
          </div>
          <div className="md:hidden">
            <IconButton icon={<UilBrightness />} onClick={handleDarkMode} />
          </div>
          <div className="lg:inline-flex items-center gap-x-10 hidden">
            <Link
              to="/"
              className="inline-flex items-center gap-x-4 rounded-3xl text-blue-700 bg-blue-100 px-6 py-3 font-medium duration-200 hover:bg-blue-200 dark:bg-darkLightBg dark:text-white"
            >
              <UilEstate className="" />
              <span>Home</span>
            </Link>
            <button
              onClick={handleModal}
              type="button"
              className="bg-gray-100 px-6 py-3 rounded-md outline-none
                text-gray-500 dark:bg-darkLightBg dark:text-white"
            >
              Search People and Friends
            </button>
            {modal.isOpen ? (
              <SearchModal modal={modal} handleModal={handleModal} />
            ) : (
              ""
            )}
          </div>
          <div className="md:flex items-center gap-x-2 hidden">
            <IconButton icon={<UilEnvelopeCheck />} />
            <Dropdown
              customToggle={renderNotificationToggle}
              contentData={notifications?.notification}
              renderItems={(item, index) => renderNotificationMenu(item, index)}
            />
            <IconButton icon={<UilBrightness />} onClick={handleDarkMode} />
            <Dropdown
              customToggle={renderUserToggle}
              contentData={toggleUserMenuList}
              renderItems={(item, index) => renderUserMenu(item, index)}
              customButton={{ icon: <UilSignOutAlt />, name: "Sign Out" }}
              onClick={handleLogout}
            />
          </div>
        </header>
      </div>

      {/* Bottom navigation */}
      <header>
        <nav className="dark:bg-darkBg fixed bottom-0 right-0 left-0 bg-white rounded-t-3xl shadow-[0_-5px_5px_-5px_#0000003d] md:hidden z-10">
          <ul className="flex justify-between container mx-auto p-6 sm:px-16 w-full">
            {mobileNavigationList.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.link}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "flex flex-col items-center justify-center  p-2 rounded-full duration-300 text-blue-700 bg-blue-200 dark:bg-slate-600 dark:text-slate-300"
                      : isPending
                      ? ""
                      : " flex flex-col items-center justify-center p-2 rounded-full duration-300 text-blue-700 bg-blue-100  hover:bg-blue-200 dark:text-slate-200 dark:hover:text-slate-300 dark:bg-darkLightBg dark:hover:bg-slate-600"
                  }
                >
                  {item.icon}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
