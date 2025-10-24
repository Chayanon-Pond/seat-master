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
    <div className="bg-white rounded-md shadow-sm border border-[#C2C2C2] p-4 sm:p-6 mb-6 w-full sm:max-w-[480px] md:max-w-[680px] mx-auto lg:mx-0 lg:w-[1120px] h-auto lg:h-[460px] overflow-hidden flex flex-col">
      <div>
        <h3 className="text-[20px] sm:text-[28px] md:text-[34px] lg:text-[40px] text-[var(--color-light-blue)] font-semibold mb-3">
          {title}
          <hr className="my-3 border-t border-gray-200" />
        </h3>
        {description && (
          <p className="text-[12px] sm:text-[16px] md:text-[20px] lg:text-[24px] text-gray-700 mt-6">
            {description}
          </p>
        )}
      </div>

      <div className="mt-8 sm:mt-12 md:mt-auto">
        <div className="flex flex-row items-center gap-4 justify-between">
          <div className="flex items-center text-gray-600">
            <div className="flex items-center gap-2 text-gray-600">
              <img
                src="/user-back.svg"
                alt="people"
                className="w-4 h-4 sm:w-6 sm:h-6 opacity-80"
              />
              <span className="text-[12px] sm:text-[16px] md:text-[20px] lg:text-[24px] font-medium">
                {seats.toLocaleString()}
              </span>
            </div>
          </div>
          {reserved ? (
            <button
              onClick={onCancel}
              className="apply text-white px-3 py-2 sm:px-4 sm:py-2 md:px-4 md:py-3 rounded-md hover:opacity-90 cursor-pointer text-[12px] sm:text-[16px] md:text-[20px] lg:text-[24px]"
              style={{ backgroundColor: "#F96464" }}
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={onReserve}
              className="bg-[var(--color-light-blue)] text-white px-3 py-2 sm:px-4 sm:py-2 md:px-4 md:py-3 rounded-md hover:opacity-90 cursor-pointer text-[12px] sm:text-[16px] md:text-[20px] lg:text-[24px]"
            >
              Reserve
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
