import IconButton from "../components/Button/IconButton";
import ResetPasswordForm from "../components/Form/ResetPasswordForm";
import { UilSignOutAlt, UilTrash, UilEdit } from "@iconscout/react-unicons";
import useModal from "../hooks/useModal";
import useLogout from "../hooks/useLogout";
import useResetPassword from "../hooks/useResetPassword";
import { useDeleteUserMutation } from "../features/user/userApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { currentUser, logout } from "../features/auth/authSlice";
import DeleteModal from "../components/Modal/DeleteModal";
import EditUser from "../features/user/EditUser";
import Modal from "../components/Modal/Modal";

export default function Settings() {
  const { modal, handleModal } = useModal();
  const { handleLogout } = useLogout();
  const { handleReset } = useResetPassword();
  const userId = useSelector(currentUser);
  const [deleteUser] = useDeleteUserMutation();
  const dispatch = useDispatch();

  const handleDelete = async (userId) => {
    await deleteUser(userId).unwrap();
    document.documentElement.classList.remove("dark");
    dispatch(logout());
  };
  const onSubmit = async (data) => {
    handleReset(data);
  };
  return (
    <div className="container mx-auto px-3 space-y-6">
      <div className="dark:bg-darkBg space-y-2 p-4 rounded-md shadow-md bg-white">
        <div
          onClick={() => handleModal("edit")}
          className=" cursor-pointer text-gray-500 font-medium flex items-center gap-8 rounded-md px-5 py-1 tracking-normal duration-200 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-darkLightBg dark:text-white"
        >
          <IconButton icon={<UilEdit />} />
          <span>Edit Profile</span>
        </div>
        <div
          onClick={() => handleModal("delete")}
          className=" cursor-pointer text-gray-500 font-medium flex items-center gap-8 rounded-md px-5 py-1 tracking-normal duration-200 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-darkLightBg dark:text-white"
        >
          <IconButton icon={<UilTrash />} />
          <span>Delete Account</span>
        </div>
        <div
          onClick={handleLogout}
          className=" cursor-pointer text-gray-500 md:hidden font-medium flex items-center gap-8 rounded-md px-5 py-1 tracking-normal duration-200 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-darkLightBg dark:text-white"
        >
          <IconButton icon={<UilSignOutAlt />} />
          <span>Sign Out</span>
        </div>
      </div>

      {modal.content === "edit" ? (
        <div className="dark:bg-darkBg space-y-2 p-4 rounded-md shadow-md bg-white">
          <Modal
            isOpen={modal.isOpen}
            title="Edit Profile"
            handleModal={handleModal}
          >
            <EditUser handleModal={handleModal} />
          </Modal>
        </div>
      ) : null}
      {modal.content === "delete" ? (
        <DeleteModal
          name="Account"
          isOpen={modal.isOpen}
          handleModal={handleModal}
          handleDelete={() => handleDelete(userId)}
        />
      ) : null}
    </div>
  );
}
