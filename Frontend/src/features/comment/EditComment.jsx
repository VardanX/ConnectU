import { useForm } from "react-hook-form";
import { TextAreaInput } from "../../components/Input/TextAreaInput";
import SecondarySubmitButton from "../../components/Button/SecondarySubmitButton";
import { useSelector } from "react-redux";
import { currentUser } from "../auth/authSlice";
import { useUpdateCommentMutation } from "./commentApiSlice";
import { toast } from "react-toastify";

export default function EditComment({
  comments,
  handleCommentEditToggle,
  postId,
  commentId,
}) {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      comments,
    },
  });

  const userId = useSelector(currentUser);

  const [updateComment] = useUpdateCommentMutation();

  const handleUpdateComment = async ({ comments }) => {
    await toast.promise(
      updateComment({
        postId,
        commentId,
        description: comments.trim(),
        userId,
      }).unwrap(),
      {
        pending: {
          render() {
            handleCommentEditToggle();
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

  return (
    <form onSubmit={handleSubmit(handleUpdateComment)}>
      <TextAreaInput
        name="comments"
        rows={1}
        placeholder="Write a comment"
        register={register}
      />
      <div className="flex justify-end">
        <SecondarySubmitButton value="update" />
      </div>
    </form>
  );
}
