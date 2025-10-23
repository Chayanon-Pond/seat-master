import React, { useEffect, useRef } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title = "Are you sure to delete?",
  message,
  confirmLabel = "Yes, Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;
  const modalRef = useRef<HTMLDivElement | null>(null);

  // ปิด modal เมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onCancel();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onCancel]);

  // ปิด modal เมื่อกด Esc
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg w-full max-w-[422px] h-[256px] p-6 flex items-center"
        style={{ borderColor: "#C4C4C4", position: "absolute", top: "471px", left: "553px" }}
      >
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <img src="/VectorX.svg" alt="close" className="w-12 h-12" />
          </div>

          <h3 className="text-lg font-semibold text-center">{title}</h3>

          {message ? (
            typeof message === "string" ? (
              <p className="text-sm text-center text-gray-600">{message}</p>
            ) : (
              <div className="text-center">{message}</div>
            )
          ) : null}

          <div className="w-full flex items-center justify-center gap-4 mt-2">
            <button
              onClick={onCancel}
              className="w-[179px] h-[48px] rounded bg-white border text-[16px] text-black hover:bg-gray-200 cursor-pointer flex items-center justify-center"
              style={{ borderColor: "#C4C4C4", fontFamily: "var(--font-ibm-thai)" }}
            >
              {cancelLabel}
            </button>

            <button
              onClick={onConfirm}
              style={{ backgroundColor: "var(--color-red)", fontFamily: "var(--font-ibm-thai)" }}
              className="w-[179px] h-[48px] rounded text-white text-[16px] hover:opacity-80 cursor-pointer flex items-center justify-center"
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
