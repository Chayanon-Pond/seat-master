import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";

type Variant = "default" | "success" | "error";

interface CustomToastProps {
  title?: string;
  description?: string;
  variant?: Variant;
  onClose?: () => void;
  duration?: number;
}

export function CustomToast({
  title,
  description,
  variant = "default",
  onClose,
  duration = 4000,
}: CustomToastProps) {
  const variantClasses: Record<Variant, { container: string; text: string }> = {
    default: {
      container: "bg-[var(--background)] border-[rgba(0,0,0,0.04)]",
      text: "text-white",
    },
    success: { container: "bg-[var(--background)]", text: "text-white" },
    error: { container: "bg-[var(--background)]", text: "text-white" },
  };

  const containerClass = [
    "relative w-[246px] h-[52px] shadow-lg",
    "py-[6px] px-[16px] rounded-[6px]",
    "flex items-center gap-3",
    "text-[14px] leading-5",
    variantClasses[variant].container,
  ].join(" ");

  const contentClass = ["flex-1", variantClasses[variant].text].join(" ");

  const titleClass = "m-0 font-semibold text-[14px]";
  const descClass = "m-0 text-[14px] opacity-90 mt-0.5";

  useEffect(() => {
    if (!duration || duration <= 0) return;

    const timer = setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className="fixed top-[5px] right-[8px] z-50"
      style={{ fontFamily: "'IBM Plex Sans Thai'" }}
    >
      <div className={containerClass} role="status" aria-live="polite">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          {variant === "success" ? (
            <img src="/check-circle.svg" width={20} height={20} alt="success" />
          ) : variant === "error" ? (
            <img src="/CloseFilled.svg" width={20} height={20} alt="error" />
          ) : (
            <img src="/check-circle.svg" width={20} height={20} alt="info" />
          )}
        </div>

        {/* Content */}
        <div className={contentClass}>
          {title ? <h4 className={titleClass}>{title}</h4> : null}
          {description ? <p className={descClass}>{description}</p> : null}
        </div>

        {/* Close Button */}
        {onClose ? (
          <button
            aria-label="close-toast"
            onClick={onClose}
            className="ml-2 mt-0.5 p-1 rounded-full opacity-90 hover:opacity-100 transition-colors"
            style={{
              background: "transparent",
              border: 0,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }} aria-hidden>
              ×
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
}

export const CustomToast_Notification = {
  create: (description?: string) => {
    showToast({
      title: "",
      description: description || "Create successfully",
      variant: "success",
    });
    console.log("Create successfully");
  },
  delete: (description?: string) => {
    showToast({
      title: "",
      description: description || "Delete successfully",
      variant: "success",
    });
    console.log("Delete successfully");
  },
};

export default CustomToast;

type ToastPayload = {
  title?: string;
  description?: string;
  variant?: "default" | "success" | "error";
};

function showToast(payload: ToastPayload, duration = 3000) {
  if (typeof document === "undefined") return;

  const container = document.createElement("div");
  document.body.appendChild(container);

  const root = createRoot(container);

  const cleanup = () => {
    try {
      root.unmount();
    } catch (e) {}
    if (container.parentNode) container.parentNode.removeChild(container);
  };

  root.render(
    <CustomToast
      title={payload.title}
      description={payload.description}
      variant={payload.variant}
      onClose={cleanup}
      duration={duration}
    />
  );

  if (duration && duration > 0) {
    setTimeout(cleanup, duration + 100);
  }
}
