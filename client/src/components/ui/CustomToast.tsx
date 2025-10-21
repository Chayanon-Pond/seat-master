import React from "react";

type Variant = "default" | "success" | "error";

interface CustomToastProps {
  title?: string;
  description?: string;
  variant?: Variant;
  onClose?: () => void;
}

/**
 * CustomToast
 * - Typography: 14px, IBM Plex Sans Thai (fallbacks)
 * - Text color: #2B2B2B
 * - Padding: 6px top/bottom, 16px left/right
 * - Border radius: 6px
 * - Simple variants: success / error / default
 */
export function CustomToast({
  title,
  description,
  variant = "default",
  onClose,
}: CustomToastProps) {
  const variantClasses: Record<Variant, string> = {
    default: "bg-white border-[rgba(0,0,0,0.04)]",
    success: "bg-[#D0E7D2] border-[rgba(0,0,0,0.06)]",
    error: "bg-[#FCEAEA] border-[rgba(0,0,0,0.06)]",
  };

  const containerClass = [
    "relative max-w-[420px] shadow-md",
    "py-1.5 px-4 rounded-[6px]",
    "flex flex-col gap-1.5",
    "text-[#2B2B2B] text-sm leading-5",
    variantClasses[variant],
    "border",
  ].join(" ");

  const titleClass = "m-0 font-semibold text-sm text-[#2B2B2B]";
  const descClass = "m-0 text-sm text-[#2B2B2B] opacity-90";

  return (
    <div className="relative" style={{ fontFamily: "'IBM Plex Sans Thai'" }}>
      <div className={containerClass} role="status" aria-live="polite">
        {title ? <h4 className={titleClass}>{title}</h4> : null}
        {description ? <p className={descClass}>{description}</p> : null}
      </div>

      {onClose ? (
        <button
          aria-label="close-toast"
          onClick={onClose}
          className="absolute top-2 right-2 p-1 text-[#2B2B2B] bg-transparent border-0 cursor-pointer"
        >
          ×
        </button>
      ) : null}
    </div>
  );
}

export default CustomToast;
