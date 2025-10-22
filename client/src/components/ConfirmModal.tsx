import React, { useEffect, useRef } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
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
        className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <img src="/VectorX.svg" alt="close" className="w-12 h-12" />
          </div>

          <h3 className="text-lg font-semibold text-center">{title}</h3>

          {message ? (
            <p className="text-sm text-center text-gray-600">{message}</p>
          ) : null}

          <div className="w-full flex items-center justify-center gap-4 mt-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded bg-white border text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
            >
              {cancelLabel}
            </button>

            <button
              onClick={onConfirm}
              style={{ backgroundColor: "var(--color-red)" }}
              className="px-4 py-2 rounded text-white text-sm hover:opacity-80 cursor-pointer"
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
