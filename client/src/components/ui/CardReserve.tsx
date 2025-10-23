"use client";

import React from "react";
import { FiUser } from "react-icons/fi";

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
    <div className="bg-white rounded-md shadow-sm border p-6 mb-6 w-[1120px] h-[375px] overflow-hidden flex flex-col">
      <div>
        <h3 className="text-[40px] text-[var(--color-light-blue)] font-semibold mb-3">
          {title}
          <hr className="my-3 border-t border-gray-200" />
        </h3>
        {description && (
          <p className="text-[24px] text-gray-700 mt-6">{description}</p>
        )}
      </div>

      <div className="mt-auto">
        <div className="flex flex-row items-center gap-4 justify-between">
          <div className="flex items-center text-gray-600">
            <div className="flex items-center gap-2 text-gray-600">
              <FiUser size={20} />
              <span className="text-[24px] font-medium">
                {seats.toLocaleString()}
              </span>
            </div>
          </div>
          {reserved ? (
            <button
              onClick={onCancel}
              className="bg-red-400 text-white px-4 py-2 rounded-md hover:opacity-90 cursor-pointer text-[24px]"
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
