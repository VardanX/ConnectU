import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSignupMutation } from "./authApiSlice";
import Input from "../../components/Input/Input";
import SubmitButton from "../../components/Button/SubmitButton";

export default function SignUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });

  const navigate = useNavigate();
  const [signUp] = useSignupMutation();

  const onSubmit = async (data) => {
    await toast.promise(signUp(data).unwrap(), {
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
  };
  return (
    <div className="container mx-auto flex justify-center items-center">
      <div className="shadow-md rounded-md flex flex-col w-full sm:w-3/4 md:w-3/5 lg:w-2/5">
        <h3 className="text-center text-2xl font-bold pt-1">Sign Up</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-10 flex flex-col gap-y-5 "
        >
          {/* <div className="">
            <label htmlFor="">Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-100 file:text-blue-700
                     hover:file:bg-blue-200 file:cursor-pointer
                     "
            />
          </div> */}

          <div className="md:flex items-center gap-x-4 ">
            <Input
              type="text"
              label="First Name"
              placeholder="First Name"
              name="firstName"
              register={register}
              errors={errors}
            />
            <Input
              type="text"
              label="Last Name"
              placeholder="Last Name"
              name="lastName"
              register={register}
              errors={errors}
            />
          </div>
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
          <div className="md:flex items-center gap-x-4 ">
            <Input
              type="text"
              label="Address"
              placeholder="Address"
              name="address"
              register={register}
              errors={errors}
            />
            <Input
              type="text"
              label="Occupation"
              placeholder="Occupation"
              name="occupation"
              register={register}
              errors={errors}
            />
          </div>
          <SubmitButton value="Sign Up" />
          <h5>
            Not a member ?{" "}
            <span>
              <Link
                to="/signin"
                className="pl-1 font-medium  text-blue-600 duration-300 hover:text-blue-700"
              >
                Sign In
              </Link>
            </span>
          </h5>
        </form>
      </div>
    </div>
  );
}
