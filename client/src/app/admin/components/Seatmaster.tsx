"use client";

import React, { useMemo, useState } from "react";
import Cardconcerts from "./Cardconcerts";
import { useConcertsContext } from "../context/concertContext";

export default function Seatmaster() {
  const { concerts, handleDeleteConcert } = useConcertsContext();
  const [tab, setTab] = useState<"overview" | "create">("overview");

  const totals = useMemo(() => {
    const totalSeats = concerts.reduce(
      (s, c) => s + (c.seat ?? c.available_seats ?? 0),
      0
    );
    const reserve =
      concerts.reduce((r, c) => r + (c.reserved_seats ?? 0), 0) || 120;
    const cancel =
      concerts.reduce((r, c) => r + (c.cancelled_seats ?? 0), 0) || 12;
    return { totalSeats, reserve, cancel };
  }, [concerts]);

  return (
    <div className="p-6">
      {/* Stats cards */}
      <div className="flex flex-col sm:flex-row sm:space-x-2.5 gap-4 mb-6">
        <div className="rounded-[8px] w-[350px] h-[234px] px-4 py-6 bg-[var(--color-blue)] text-white flex flex-col items-center">
          <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center mb-4">
            <img src="/user.svg" alt="user" className="w-5 h-5" />
          </div>
          <div className="text-sm opacity-90">Total of seats</div>
          <div className="text-[48px] font-semibold mt-4">
            {totals.totalSeats}
          </div>
        </div>

        <div className="rounded-[8px] w-[350px] h-[234px] px-4 py-6 bg-[var(--color-teal)] text-white flex flex-col items-center">
          <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center mb-4">
            <img src="/award.svg" alt="award" className="w-5 h-5" />
          </div>
          <div className="text-sm opacity-90">Reserve</div>
          <div className="text-[48px] font-semibold mt-4">{totals.reserve}</div>
        </div>

        <div className="rounded-[8px] w-[350px] h-[234px] px-4 py-6 bg-[var(--color-red)] text-white flex flex-col items-center">
          <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center mb-4">
            <img src="/x-circle.svg" alt="x-circle" className="w-5 h-5" />
          </div>
          <div className="text-sm opacity-90">Cancel</div>
          <div className="text-[48px] font-semibold mt-4">{totals.cancel}</div>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex items-center justify-between pb-3 mb-4">
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setTab("overview")}
              style={{ fontFamily: "Roboto, sans-serif" }}
              className={`text-[24px] font-semibold px-3 py-1  cursor-pointer ${
                tab === "overview"
                  ? "text-[var(--color-light-blue)] border-b-2 border-[var(--color-light-blue)] pb-1"
                  : "text-gray-600"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setTab("create")}
              style={{ fontFamily: "Roboto, sans-serif" }}
              className={`text-[24px] font-semibold px-3 py-1  cursor-pointer ${
                tab === "create"
                  ? "text-[var(--color-light-blue)] border-b-2 border-[var(--color-light-blue)] pb-1"
                  : "text-gray-600"
              }`}
            >
              Create
            </button>
          </div>
        </div>

        {tab === "overview" && (
          <div className="space-y-4">
            {concerts.map((c) => (
              <Cardconcerts
                key={c.id}
                concert={c}
                onDelete={handleDeleteConcert}
              />
            ))}
          </div>
        )}

        {tab === "create" && (
          <div className="py-8 text-gray-600">
            Create form placeholder (implement later)
          </div>
        )}
      </div>
    </div>
  );
}
