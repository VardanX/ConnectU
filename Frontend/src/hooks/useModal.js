import { useState } from "react";

export default function useModal() {
  const [modal, setModal] = useState({
    isOpen: false,
    content: "",
  });

  const handleModal = (modal) => {
    setModal((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
      content: !prevState.isOpen ? modal : "",
    }));
  };

  return { modal, handleModal };
}
