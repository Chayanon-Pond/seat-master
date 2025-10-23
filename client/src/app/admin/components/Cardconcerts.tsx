"use client";

import React from "react";

interface CardProps {
  concert: any;
  onDelete: (id: string) => void;
}

export default function Cardconcerts({ concert, onDelete }: CardProps) {
  const title = concert.name ?? concert.title ?? "Untitled Concert";
  const description = concert.description ?? "";
  const seats = concert.seat ?? concert.seats ?? concert.available_seats ?? 0;

  return (
    <div
      className="border rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 bg-white flex flex-col gap-6 sm:gap-6 md:gap-8 w-full max-w-[1120px] h-auto md:h-[360px] lg:h-[360px]"
      style={{ borderColor: "var(--color-border-light)" }}
    >
      <div className="flex-1">
    <h3 className="text-[var(--color-light-blue)] font-semibold text-[20px] sm:text-[24px] md:text-[34px] lg:text-[40px]">
          {title}
        </h3>
        <hr className="my-3 border-t border-gray-200" />
  <p className="text-[12px] sm:text-[14px] md:text-[18px] lg:text-[24px] text-gray-600">{description}</p>
      </div>

      <div className="flex flex-row items-center gap-4 justify-between">
        <div className="flex items-center gap-2 text-gray-600">
          <img src="/user-back.svg" alt="people" className="w-5 h-5 sm:w-6 sm:h-6 opacity-80" />
          <span className="text-[12px] sm:text-[14px] md:text-[18px] lg:text-[24px]">{seats}</span>
        </div>

        <button
          onClick={() => onDelete(concert.id)}
          className="inline-flex items-center gap-2 text-white rounded text-[12px] sm:text-[14px] md:text-[18px] lg:text-[24px] hover:opacity-80 cursor-pointer py-2 px-3 sm:py-2 sm:px-3 md:py-3 md:px-4"
          style={{
            backgroundColor: "var(--color-red)",
          }}
        >
          <img src="/trash-2.svg" alt="delete" className="w-5 h-5 " /> Delete
        </button>
      </div>
    </div>
  );
}
