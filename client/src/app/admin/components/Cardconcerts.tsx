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
    <div className="border rounded p-4 bg-white">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-blue-600 font-semibold">{title}</h3>
          <hr className="my-3 border-t border-gray-200" />
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        <div className="flex flex-col items-end justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <FiUser />
            <span className="text-sm">{seats}</span>
          </div>

          <div className="mt-4">
            <button
              onClick={() => onDelete(concert.id)}
              className="inline-flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              <FiTrash2 /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
