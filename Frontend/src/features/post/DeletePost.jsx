import DeleteModal from "../../components/Modal/DeleteModal";
import { useSelector } from "react-redux";
import { currentUser } from "../auth/authSlice";
import { useDeletePostMutation } from "./postApiSlice";
import { toast } from "react-toastify";

export default function DeletePost({ isOpen, handleModal, postId }) {
  const userId = useSelector(currentUser);

  const [deletePost] = useDeletePostMutation();

  const handleDelete = async () => {
    await toast.promise(deletePost({ userId, postId }).unwrap(), {
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
    <DeleteModal
      isOpen={isOpen}
      name="post"
      handleModal={handleModal}
      handleDelete={handleDelete}
    />
  );
}
