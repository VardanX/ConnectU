import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../components/Input/Input";
import SubmitButton from "../../components/Button/SubmitButton";
import { useSigninMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";

export default function SignIn() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signin] = useSigninMutation();

  const onSubmit = async (data) => {
    await toast.promise(signin(data).unwrap(), {
      pending: {
        render() {
          return "Loading";
        },
      },
      success: {
        render({ data }) {
          dispatch(setCredentials(data?.accessToken));
          navigate("/");
          return `${data?.message} 👌`;
        },
      },
      error: {
        render({ data }) {
          return `${data?.data?.message} 🤯`;
        },
      },
    });
  };
  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="shadow-md rounded-md flex flex-col w-full sm:w-3/4 md:w-3/5 lg:w-2/4 xl:w-4/12">
        <h3 className="text-center text-2xl font-bold pt-1">Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-10 flex flex-col gap-y-5 "
        >
          <Input
            type="email"
            label="Email"
            placeholder="Email"
            name="email"
            register={register}
            errors={errors}
            pattern={{
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: "Please Enter the valid email address",
            }}
          />
          <Input
            type="password"
            label="Password"
            placeholder="Password"
            name="password"
            register={register}
            errors={errors}
          />
          <SubmitButton value="Sign In" />
          <h5>
            Not a member ?{" "}
            <span>
              <Link
                to="/signup"
                className="pl-1 font-medium  text-blue-600 duration-300 hover:text-blue-700"
              >
                Register now
              </Link>
            </span>
          </h5>
          <h5>
            Forget Password ?{" "}
            <span>
              <Link
                to="/resetpassword"
                className="pl-1 font-medium text-blue-600 duration-300 hover:text-blue-700"
              >
                Reset Password
              </Link>
            </span>
          </h5>
        </form>
      </div>
    </div>
  );
}
