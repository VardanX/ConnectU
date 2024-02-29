import SubmitButton from "../../components/Button/SubmitButton";
import { FileInput } from "../../components/Input/FileInput";
import { TextAreaInput } from "../../components/Input/TextAreaInput";
import { useForm } from "react-hook-form";
import { usePhotoUploadMutation } from "../fileUpload/fileUploadApiSlice";
import { useCreatePostMutation } from "./postApiSlice";
import { useSelector } from "react-redux";
import { currentUser } from "../auth/authSlice";
import { toast } from "react-toastify";
import { currentUserProfilePicture } from "../user/userSlice";

export default function CreatePost() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    criteriaMode: "all",
  });

  const userId = useSelector(currentUser);
  const [uploadPhoto] = usePhotoUploadMutation();
  const [createPost] = useCreatePostMutation();
  const currentUserProfile = useSelector(currentUserProfilePicture);

  const onSubmit = async (data) => {
    const postImageFormData = new FormData();
    const postImage = data.photo;
    postImageFormData.append("postImg", postImage[0]);

    const toastId = toast.loading("Loading");
    reset();
    try {
      const { secure_url } = await uploadPhoto(postImageFormData).unwrap();
      const result = await createPost({
        userId,
        description: data.caption,
        postPicturePath: secure_url,
      }).unwrap();

      toast.dismiss(toastId);
      toast.success(result?.message);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="bg-white px-5 py-4 rounded-md shadow-md dark:bg-darkBg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-x-3 items-center">
          <img
            src={currentUserProfile}
            alt="profile-image"
            className="w-11 h-10 rounded-full object-cover"
          />
          <TextAreaInput
            name="caption"
            placeholder="What's on your mind..."
            register={register}
          />
        </div>
        <hr className="my-6" />
        <div className="flex items-center justify-between">
          <FileInput name="photo" register={register} errors={errors} />
          <SubmitButton value="Post" />
        </div>
      </form>
    </div>
  );
}
