import PrimaryButton from "../Button/PrimaryButton";
import SecondaryButton from "../Button/SecondaryButton";
import Modal from "./Modal";

export default function DeleteModal({
  isOpen,
  handleModal,
  handleDelete,
  name,
}) {
  return (
    <Modal isOpen={isOpen} handleModal={handleModal} title="Delete Post">
      <h1 className="text-2xl font-semibold text-slate-600 my-4 dark:text-slate-200">
        Are you sure want to delete {name} ?
      </h1>
      <div className="flex justify-between items-center gap-x-8">
        <PrimaryButton name="Cancel" onClick={handleModal} />
        <SecondaryButton name="Delete" onClick={handleDelete} />
      </div>
    </Modal>
  );
}
