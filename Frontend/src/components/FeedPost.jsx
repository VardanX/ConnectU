import { Link } from "react-router-dom";
import IconButton from "./Button/IconButton";
import Dropdown from "./Dropdown/Dropdown";
import PrimaryButton from "./Button/PrimaryButton";
import SecondaryButton from "./Button/SecondaryButton";
import useModal from "../hooks/useModal";
import EditPost from "../features/post/EditPost";
import DeletePost from "../features/post/DeletePost";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  UilHeart,
  UilComment,
  UilShare,
  UilElipsisDoubleVAlt,
} from "@iconscout/react-unicons";
import { currentUser } from "../features/auth/authSlice";
import Comments from "../features/comment/Comments";
import TextIconButton from "./Button/TextIconButton";
import {
  useGetIsPostLikedQuery,
  useLikePostMutation,
} from "../features/post/postApiSlice";
import { socket } from "../socket";
import { currentUserName } from "../features/user/userSlice";
const renderPostToggle = () => <IconButton icon={<UilElipsisDoubleVAlt />} />;

export default function FeedPost({
  profielImg,
  postUserName,
  location,
  createdAt,
  postImg,
  description,
  userId,
  postId,
}) {
  const { modal, handleModal } = useModal();
  const currentUserId = useSelector(currentUser);
  const currentuserName = useSelector(currentUserName);
  const { data: isPostLiked } = useGetIsPostLikedQuery(postId);
  const [likePost] = useLikePostMutation();

  const postMenuList = [
    {
      button: <PrimaryButton name="Edit" onClick={() => handleModal("edit")} />,
    },
    {
      button: (
        <SecondaryButton name="Delete" onClick={() => handleModal("delete")} />
      ),
    },
  ];

  const renderPostMenu = (item, index) => <li key={index}>{item.button}</li>;

  const handleLikePost = async (postId) => {
    await toast.promise(likePost(postId).unwrap(), {
      pending: {
        render() {
          return "Loading";
        },
      },
      success: {
        render({ data }) {
          currentUserId !== userId &&
            socket.emit("sendNotification", {
              currentUserId,
              currentuserName,
              userId,
              postId,
            });
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
    <div className="bg-white mt-8 px-5 py-4 rounded-md shadow-md dark:bg-darkBg">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-4">
          <img
            src={profielImg}
            alt="profile-image"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="">
            <Link
              to={`/profile/${userId}`}
              className="text-lg text-gray-900 font-medium duration-300 hover:text-blue-700 dark:text-white dark:hover:text-slate-300"
            >
              {postUserName}
            </Link>
            <p className="text-sm font-medium text-blue-700 dark:text-slate-300 capitalize">
              {location}{" "}
              <span className="text-gray-500 pl-2 dark:text-slate-300">
                {createdAt}
              </span>
            </p>
          </div>
        </div>
        {currentUserId === userId ? (
          <Dropdown
            customToggle={renderPostToggle}
            contentData={postMenuList}
            renderItems={(item, index) => renderPostMenu(item, index)}
          />
        ) : (
          ""
        )}
        {modal.content === "edit" && (
          <EditPost
            isOpen={modal.isOpen}
            handleModal={handleModal}
            postImage={postImg}
            caption={description}
            postId={postId}
          />
        )}
        {modal.content === "delete" && (
          <DeletePost
            isOpen={modal.isOpen}
            handleModal={handleModal}
            postId={postId}
          />
        )}
      </div>
      <img
        src={postImg}
        alt="feed-photo"
        className="rounded-md my-6 w-full h-80 object-cover"
      />
      <p className="text-sm font-medium text-gray-500 pb-3 dark:text-slate-300">
        {description}
      </p>
      <hr className="my-1 border-solid dark:border-gray-500" />
      <div className="text-blue-700 flex items-center gap-x-4 justify-around cursor-pointer  dark:text-white">
        <TextIconButton
          onClick={() => handleLikePost(postId)}
          icon={
            isPostLiked?.isPostLiked ? <UilHeart color="red" /> : <UilHeart />
          }
          name="love"
        />
        <TextIconButton
          icon={<UilComment />}
          name="comment"
          onClick={() => handleModal("comment")}
        />
        <TextIconButton icon={<UilShare />} name="share" />
      </div>
      <hr className="my-1 border-solid dark:border-gray-500" />
      {modal.content === "comment" && <Comments postId={postId} />}
    </div>
  );
}
