import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../socket";
import {
  notification,
  setNotification,
} from "../features/Notification/notificationSlice";

export default function Notifications() {
  const notifications = useSelector(notification);
  // const dispatch = useDispatch();
  console.log("notification", notifications);

  // useEffect(() => {
  //   const dispatchNotification = (socketId) => {
  //     dispatch(setNotification(socketId));
  //   };
  //   socket.on("getNotification", dispatchNotification);
  //   return () => {
  //     socket.off("getNotification", dispatchNotification);
  //   };
  // }, [socket]);

  return <h1>notifications</h1>;
}
