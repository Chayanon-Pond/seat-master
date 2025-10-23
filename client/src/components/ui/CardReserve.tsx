"use client";

import React from "react";

type Props = {
  title: string;
  description?: string;
  seats: number;
  reserved?: boolean;
  onReserve?: () => void;
  onCancel?: () => void;
};

export default function CardReserve({
  title,
  description,
  seats,
  reserved = false,
  onReserve,
  onCancel,
}: Props) {
  return (
    <div className="bg-white rounded-md shadow-sm border border-[#C2C2C2] p-6 mb-6 w-[1120px] h-[375px] overflow-hidden flex flex-col">
      <div>
        <h3 className="text-[40px] text-[var(--color-light-blue)] font-semibold mb-3">
          {title}
          <hr className="my-3 border-t border-gray-200" />
        </h3>
        {description && (
          <p className="text-[24px] text-gray-700 mt-6">{description}</p>
        )}
      </div>

      <div className="mt-16">
        <div className="flex flex-row items-center gap-4 justify-between">
          <div className="flex items-center text-gray-600">
            <div className="flex items-center gap-2 text-gray-600">
              <img
                src="/user-back.svg"
                alt="people"
                className="w-6 h-6 opacity-80"
              />
              <span className="text-[24px] font-medium">
                {seats.toLocaleString()}
              </span>
            </div>
          </div>
          {reserved ? (
            <button
              onClick={onCancel}
              className="apply text-white px-4 py-2 rounded-md hover:opacity-90 cursor-pointer text-[24px]"
              style={{ backgroundColor: "#F96464" }}
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={onReserve}
              className="bg-[var(--color-light-blue)] text-white px-4 py-2 rounded-md hover:opacity-90 cursor-pointer text-[24px]"
            >
              Reserve
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
