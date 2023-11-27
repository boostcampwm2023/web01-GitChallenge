import { useState } from "react";

export default function useModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  return { modalOpen, openModal, closeModal };
}
