import SubmitButton from "../Button/SubmitButton";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";

export default function ResetPasswordForm({ onSubmit }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });
  return (
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
        label="New Password"
        placeholder="New Password"
        name="password"
        register={register}
        errors={errors}
      />
      <SubmitButton value="Reset" />
    </form>
  );
}
