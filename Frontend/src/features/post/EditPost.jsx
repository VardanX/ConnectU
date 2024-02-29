import { TextAreaInput } from "../../components/Input/TextAreaInput";
import { useForm } from "react-hook-form";
import SubmitButton from "../../components/Button/SubmitButton";
import Modal from "../../components/Modal/Modal";
import { useUpdatePostMutation } from "./postApiSlice";
import { useSelector } from "react-redux";
import { currentUser } from "../auth/authSlice";
import { toast } from "react-toastify";

export default function EditPost({
  handleModal,
  postImage,
  caption,
  isOpen,
  postId,
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      caption,
    },
  });

  const [updatePost] = useUpdatePostMutation();
  const userId = useSelector(currentUser);

  const onSubmit = async (data) => {
    await toast.promise(updatePost({ ...data, userId, postId }).unwrap(), {
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
    <Modal isOpen={isOpen} handleModal={handleModal} title="Edit Post">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextAreaInput
          name="caption"
          placeholder="What's on your mind..."
          register={register}
        />
        <img
          src={postImage}
          alt="post-image"
          className="rounded-md my-6 w-full h-60 object-cover"
        />
        <SubmitButton value="Save" fullWidth={true} />
      </form>
    </Modal>
  );
}
