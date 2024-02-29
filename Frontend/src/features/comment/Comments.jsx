import { Link } from "react-router-dom";
import {
  useDeleteCommentMutation,
  useGetAllCommentQuery,
} from "./commentApiSlice";
import CreateComment from "./CreateComment";
import Button from "../../components/Button/Button";
import moment from "moment";
import { useSelector } from "react-redux";
import { currentUser } from "../auth/authSlice";
import { toast } from "react-toastify";
import useModal from "../../hooks/useModal";
import EditComment from "./EditComment";
import LoadingIndicator from "../../components/Indicator/LoadingIndicator";

export default function Comments({ postId }) {
  const { isLoading, isError, data } = useGetAllCommentQuery(postId);

  const userId = useSelector(currentUser);

  const { modal, handleModal } = useModal();

  const [deleteComment] = useDeleteCommentMutation();

  const handleCommentEditToggle = (commentId) => handleModal(commentId);

  const handleCommentDelete = async (commentId) => {
    await toast.promise(deleteComment({ postId, commentId, userId }).unwrap(), {
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
    });
  };

  return (
    <div className="">
      <CreateComment postId={postId} />
      <div className="">
        {isLoading ? (
          <LoadingIndicator />
        ) : isError ? (
          ""
        ) : (
          <ul>
            {data.commentList.map((item, index) => (
              <li key={index} className="flex items-center gap-x-4 mt-3">
                <img
                  src={item.userPicturePath}
                  alt="profile-image"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className=" w-fit my-1">
                  <div className="bg-stone-50 py-2 px-3 rounded-md dark:bg-darkLightBg">
                    <Link
                      to={`/profile/${item.userId}`}
                      className="text-sm text-gray-900 font-medium duration-300 hover:text-blue-700 hover:underline dark:text-white dark:hover:text-white"
                    >
                      {item.userName}
                    </Link>
                    {modal.content === item._id ? (
                      <EditComment
                        comments={item.description}
                        commentId={item._id}
                        postId={item.postId}
                        handleCommentEditToggle={() =>
                          handleCommentEditToggle(item._id)
                        }
                      />
                    ) : (
                      <span className="block space-y-1 text-gray-700 text-sm font-normal dark:text-white">
                        {item.description}
                      </span>
                    )}
                  </div>
                  <div className="space-x-2">
                    {item.userId === userId ? (
                      <>
                        <Button
                          name="edit"
                          onClick={() => handleCommentEditToggle(item._id)}
                        />
                        <Button
                          name="delete"
                          onClick={() => handleCommentDelete(item._id)}
                        />
                      </>
                    ) : null}

                    <span className="text-[11px] text-gray-600 dark:text-gray-300 font-medium">
                      {moment(item.createdAt).fromNow()}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
