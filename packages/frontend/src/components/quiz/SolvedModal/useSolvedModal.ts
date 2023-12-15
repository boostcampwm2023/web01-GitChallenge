import { useCallback, useState } from "react";

import useModal from "../../../hooks/useModal";

const LAST_QUIZ_ID = 19;

export function useSolvedModal(id: number) {
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
    lastQuiz: id === LAST_QUIZ_ID,
    shareLink,
    modalOpen,
    openModal,
    closeModal,
    onSolved: handleSolved,
  };
}
