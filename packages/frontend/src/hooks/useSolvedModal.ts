import { useCallback, useState } from "react";

import useModal from "./useModal";

export function useSolvedModal() {
  const [shareLink, setShareLink] = useState("");
  const { modalOpen, openModal, closeModal } = useModal();

  const handleSolved = useCallback(
    (link: string) => {
      setShareLink(link);
      openModal();
    },
    [openModal],
  );

  return {
    shareLink,
    modalOpen,
    openModal,
    closeModal,
    onSolved: handleSolved,
  };
}
