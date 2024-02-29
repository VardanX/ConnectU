import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import SubmitButton from "../../components/Button/SubmitButton";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { currentUser } from "../auth/authSlice";
import { useUpdateUserMutation } from "./userApiSlice";

export default function EditUser({ handleModal }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });
  const userId = useSelector(currentUser);
  const [updateUser] = useUpdateUserMutation();
  const handleEditUser = async (data) => {
    await toast.promise(updateUser({ ...data, userId }).unwrap(), {
      pending: {
        render() {
          handleModal();
          return "Loading";
        },
      },
      success: {
        render({ data }) {
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
    <form
      onSubmit={handleSubmit(handleEditUser)}
      className="flex flex-col space-y-4"
    >
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
      <SubmitButton value="Update Profile" />
    </form>
  );
}
