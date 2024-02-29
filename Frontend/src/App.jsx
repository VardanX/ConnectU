import { Outlet } from "react-router-dom";
import Header from "./layouts/Header";
import ProfileCard from "./layouts/ProfileCard";
import { useEffect } from "react";
import { socket } from "./socket";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "./features/auth/authSlice";
import People from "./components/Friend/People";
import useFetchSingleUser from "./hooks/useFetchSingleUser";
import { setUserName, setuserProfilePicture } from "./features/user/userSlice";
import LoadingIndicator from "./components/Indicator/LoadingIndicator";

export default function App() {
  const userId = useSelector(currentUser);
  const dispatch = useDispatch();
  const { isLoading, isError, data } = useFetchSingleUser(userId);
  useEffect(() => {
    dispatch(setuserProfilePicture(data?.user.picturePath));
    dispatch(setUserName(`${data?.user.firstName} ${data?.user.lastName}`));

    function onNewUser() {
      socket?.emit("newUser", { userId });
    }
    socket.on("connect", onNewUser);
    return () => {
      socket.off("connect", onNewUser);
    };
  }, [socket, userId, isLoading, isError]);

  if (isLoading) return <LoadingIndicator />;
  if (isError) return <h1>Error on Loading Current user</h1>;

  return (
    <>
      <Header picturePath={data?.user.picturePath} />
      <main className="container mx-auto px-2 lg:px-14 mt-6 flex justify-between">
        <ProfileCard user={data?.user} />
        <div className=" w-full pb-24 mt-24 lg:h-screen lg:w-5/12 md:overflow-y-auto md:scrollbar dark:md:dark__scrollbar">
          <Outlet />
        </div>
        <People mobile={false} />
      </main>
    </>
  );
}
