"use client";

import ReactConfetti from "react-confetti";
import { useConfettiStore } from "@/hooks/UseConfettiStore";

export const ConfettiProvider = () => {
  const confetti = useConfettiStore();

  if (!confetti.isOpen) {
    return null;
  }

  return (
    <ReactConfetti
      className="poiter-events-none z-[100]"
      numberOfPieces={500}
      recycle={false}
      onConfettiComplete={() => {
        confetti.onClose();
      }}
    />
  );
};
