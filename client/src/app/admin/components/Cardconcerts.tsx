"use client";

import React from "react";
import { FiUser, FiTrash2 } from "react-icons/fi";

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
      className="border rounded-lg p-10 bg-white flex flex-col gap-8 w-full max-w-[1120px] h-[360px]"
      style={{ borderColor: "var(--color-border-light)" }}
    >
      <div className="flex-1">
        <h3 className="text-[var(--color-light-blue)] font-semibold text-[40px]">
          {title}
        </h3>
        <hr className="my-3 border-t border-gray-200" />
        <p className="text-[24px] text-gray-600">{description}</p>
      </div>

      <div className="flex flex-row items-center gap-4 justify-between">
        <div className="flex items-center gap-2 text-gray-600">
          <FiUser size={20} />
          <span className="text-[24px]">{seats}</span>
        </div>

        <button
          onClick={() => onDelete(concert.id)}
          className="inline-flex items-center gap-2 text-white rounded text-sm hover:opacity-80 cursor-pointer py-3 px-4"
          style={{
            backgroundColor: "var(--color-red)",
          }}
        >
          <FiTrash2 size={20} /> Delete
        </button>
      </div>
    </div>
  );
}
