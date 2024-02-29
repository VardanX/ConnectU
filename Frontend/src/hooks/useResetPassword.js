import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";

export default function useResetPassword() {
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();

  async function handleReset(data) {
    await toast.promise(resetPassword(data).unwrap(), {
      pending: {
        render() {
          return "Loading";
        },
      },
      success: {
        render({ data }) {
          navigate("/signin");
          return `${data?.message} 👌`;
        },
      },
      error: {
        render({ data }) {
          return `${data?.data?.message} 🤯`;
        },
      },
    });
  }

  return { handleReset };
}
