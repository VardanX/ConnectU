import moment from "moment";
import FeedPost from "../components/FeedPost";
import CreatePost from "../features/post/CreatePost";
import Skeleton from "../components/Indicator/Skeleton";
import { useGetAllPostQuery } from "../features/post/postApiSlice";
import { useSelector } from "react-redux";
import { currentUser } from "../features/auth/authSlice";

export default function Home() {
  const {
    isLoading: isPostLoading,
    isError: isPostError,
    data: postData,
  } = useGetAllPostQuery();
  const userId = useSelector(currentUser);
  return (
    <>
      <CreatePost />

      {isPostLoading ? (
        <Skeleton />
      ) : isPostError ? (
        <h1 className="mt-6 text-center text-gray-500 dark:text-white font-semibold text-4xl">
          Post Not availabe
        </h1>
      ) : (
        postData.post.map((item, index) => (
          <FeedPost
            key={index}
            profielImg={item.userPicturePath}
            location={item.address}
            postUserName={`${item.firstName} ${item.lastName}`}
            postImg={item.postPicturePath}
            createdAt={moment(item.createdAt).calendar()}
            description={item.description}
            isFriend={item.friends.includes(userId)}
            userId={item.userId}
            postId={item._id}
            comments={item.comments}
          />
        ))
      )}
    </>
  );
}
