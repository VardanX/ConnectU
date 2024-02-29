import { Link } from "react-router-dom";
import ResetPasswordForm from "../../components/Form/ResetPasswordForm";
import useResetPassword from "../../hooks/useResetPassword";

export default function ResetPassword() {
  const { handleReset } = useResetPassword();

  const onSubmit = async (data) => {
    handleReset(data);
  };

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="shadow-md rounded-md flex flex-col w-full sm:w-3/4 md:w-3/5 lg:w-2/4 xl:w-4/12">
        <h3 className="text-center text-2xl font-bold pt-1">Reset Password</h3>
        <ResetPasswordForm onSubmit={onSubmit} />
        <h5 className="px-10 pb-4">
          Alreay have an account ?{" "}
          <span>
            <Link
              to="/signin"
              className="pl-1 font-medium text-blue-600 duration-300 hover:text-blue-700"
            >
              Sign In
            </Link>
          </span>
        </h5>
      </div>
    </div>
  );
}
