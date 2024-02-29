import { useSelector } from "react-redux";
import { currentUserProfilePicture } from "../user/userSlice";
import { useForm } from "react-hook-form";
import { TextAreaInput } from "../../components/Input/TextAreaInput";
import { useCreateCommentMutation } from "./commentApiSlice";
import { currentUser } from "../auth/authSlice";
import { toast } from "react-toastify";

export default function CreateComment({ postId }) {
  const profileImg = useSelector(currentUserProfilePicture);
  const userId = useSelector(currentUser);

  const { handleSubmit, register, reset } = useForm();
  const [createComment] = useCreateCommentMutation();

  const onSubmit = async (data) => {
    reset();
    document.activeElement.blur();

    await toast.promise(
      createComment({
        postId,
        description: data.comments,
        userId,
      }).unwrap(),
      {
        pending: {
          render() {
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
      }
    );
  };

  const onEnterSubmit = (event) => {
    if (event.key === "Enter" && event.shiftKey === false) {
      const { name, value } = event.target;
      return handleSubmit(onSubmit({ [name]: value.trim() }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center gap-x-4 mt-3"
    >
      <div className="">
        <img
          src={profileImg}
          alt="profile-image"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
      <TextAreaInput
        name="comments"
        placeholder="Write a comment"
        register={register}
        rows={1}
        onKeyDown={onEnterSubmit}
      />
    </form>
  );
}
