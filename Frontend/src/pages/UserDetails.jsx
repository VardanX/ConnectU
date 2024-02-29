import FeedPost from "../components/FeedPost";
import useFetchSingleUser from "../hooks/useFetchSingleUser";
import { useParams } from "react-router-dom";
import { useGetUserPostQuery } from "../features/post/postApiSlice";
import LoadingIndicator from "../components/Indicator/LoadingIndicator";
import Skeleton from "../components/Indicator/Skeleton";
import moment from "moment";
import {
  UilMapMarker,
  UilBriefcase,
  UilEnvelopeMinus,
  UilCamera,
} from "@iconscout/react-unicons";
import useModal from "../hooks/useModal";
import Modal from "../components/Modal/Modal";
import { FileInput } from "../components/Input/FileInput";
import SubmitButton from "../components/Button/SubmitButton";
import { useForm } from "react-hook-form";
import { usePhotoUploadMutation } from "../features/fileUpload/fileUploadApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { currentUser } from "../features/auth/authSlice";
import { useUpdateProfilePictureMutation } from "../features/user/userApiSlice";
import PrimaryButton from "../components/Button/PrimaryButton";
import SecondaryButton from "../components/Button/SecondaryButton";
import { useIsFriendQuery } from "../features/friend/friendApiSlice";
import useFriend from "../hooks/useFriend";

export default function UserDetails() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ criteriaMode: "all" });

  const currentUserId = useSelector(currentUser);
  const [uploadPhoto] = usePhotoUploadMutation();
  const [updateProfilePicture] = useUpdateProfilePictureMutation();
  const { userId } = useParams();
  const { modal, handleModal } = useModal();
  const { isLoading, isError, data } = useFetchSingleUser(userId);
  const { data: isFriend } = useIsFriendQuery(userId);
  const { handleAddFriend, handleRemoveFriend } = useFriend();
  const {
    isLoading: isPostLoading,
    isError: isPostError,
    data: postList,
  } = useGetUserPostQuery(userId);

  const onSubmit = async (data) => {
    const profileImageFormData = new FormData();
    const profileImage = data.photo;
    profileImageFormData.append("profileImg", profileImage[0]);
    const toastId = toast.loading("Loading");
    handleModal();
    reset();
    try {
      const { secure_url } = await uploadPhoto(profileImageFormData).unwrap();
      const result = await updateProfilePicture({
        userId: currentUserId,
        picturePath: secure_url,
      }).unwrap();
      toast.dismiss(toastId);
      toast.success(result?.message);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.data?.message);
    }
  };

  return (
    <>
      {/* Profile card  */}
      {isLoading ? (
        <LoadingIndicator />
      ) : isError ? (
        <h1>Error</h1>
      ) : (
        <div className="bg-white px-5 py-8 rounded-md shadow-md max-h-max dark:bg-darkBg">
          <div className="flex flex-col items-center space-y-1">
            <div className="relative">
              <img
                src={data.user.picturePath}
                alt="profile-image"
                className="w-20 h-20 rounded-full object-cover border-4"
              />
              {currentUserId === userId ? (
                <label
                  onClick={() => handleModal("upload")}
                  className="p-1 bg-blue-100 text-blue-700 cursor-pointer absolute right-0 bottom-0 rounded-full"
                >
                  <UilCamera />
                </label>
              ) : (
                ""
              )}
            </div>
            <h2 className="text-2xl text-gray-800 font-bold pt-3 dark:text-white">
              {data.user.firstName} {data.user.lastName}
            </h2>
            <p className="text-sm text-gray-500 font-medium dark:text-slate-200">
              {" "}
              {data.user.friends.length} friends
            </p>
            <div>
              {currentUserId !== userId ? (
                isFriend?.isFriend ? (
                  <SecondaryButton
                    name="Remove Friend"
                    onClick={() => handleRemoveFriend(userId)}
                  />
                ) : (
                  <PrimaryButton
                    name="Add Friend"
                    onClick={() => handleAddFriend(userId)}
                  />
                )
              ) : (
                ""
              )}
            </div>
          </div>
          <hr className="my-4" />
          <ul className="text-blue-700 flex flex-wrap justify-between items-center px-10 gap-4">
            <li className="inline-flex items-center gap-x-2 dark:text-slate-200">
              <UilMapMarker />
              <span className="text-gray-500 capitalize dark:text-slate-200">
                {data.user.address}
              </span>
            </li>
            <li className="inline-flex items-center gap-x-2 dark:text-slate-200">
              <UilBriefcase />
              <span className="text-gray-500 capitalize dark:text-slate-200">
                {data.user.occupation}
              </span>
            </li>
            <li className="inline-flex items-center gap-x-2 dark:text-slate-200">
              <UilEnvelopeMinus />{" "}
              <span className="text-gray-500 dark:text-slate-200">
                {data.user.email}
              </span>
            </li>
          </ul>
        </div>
      )}

      {/* Post list */}
      {isPostLoading ? (
        <Skeleton />
      ) : isPostError ? (
        <h1 className="mt-6 text-center text-gray-500 dark:text-white font-semibold text-4xl">
          Post Not availabe
        </h1>
      ) : (
        postList.post.map((item, index) => (
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

      {/* Upload profile picture */}
      {modal.content === "upload" ? (
        <Modal
          isOpen={modal.isOpen}
          handleModal={handleModal}
          title="Upload Profile Picture"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center justify-between"
          >
            <FileInput name="photo" register={register} errors={errors} />
            <SubmitButton value="Upload" />
          </form>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}
