import { useDispatch } from "react-redux";
import { useSignoutMutation } from "../features/auth/authApiSlice";
import { logout } from "../features/auth/authSlice";
import { toast } from "react-toastify";

export default function useLogout() {
  const [signOut] = useSignoutMutation();
  const dispatch = useDispatch();

  async function handleLogout() {
    try {
      const { message } = await signOut().unwrap();
      document.documentElement.classList.remove("dark");
      dispatch(logout());
      toast.warn(message);
    } catch (error) {
      toast.error("Log out failed");
    }
  }
  return { handleLogout };
}
