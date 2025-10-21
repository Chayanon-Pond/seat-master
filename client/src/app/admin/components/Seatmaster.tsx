"use client";

import React, { useMemo, useState } from "react";
import Cardconcerts from "./Cardconcerts";
import { useConcertsContext } from "../context/concertContext";

export default function Seatmaster() {
  const { concerts, handleDeleteConcert } = useConcertsContext();
  const [tab, setTab] = useState<"overview" | "create">("overview");

  const totals = useMemo(() => {
    const totalSeats = concerts.reduce((s, c) => s + (c.seat ?? c.available_seats ?? 0), 0);
    const reserve = concerts.reduce((r, c) => r + (c.reserved_seats ?? 0), 0) || 120;
    const cancel = concerts.reduce((r, c) => r + (c.cancelled_seats ?? 0), 0) || 12;
    return { totalSeats, reserve, cancel };
  }, [concerts]);

  return (
    <div className="p-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-lg p-5 bg-[#0070A4] text-white flex flex-col">
          <div className="text-sm">Total of seats</div>
          <div className="text-3xl font-semibold mt-2">{totals.totalSeats}</div>
        </div>

        <div className="rounded-lg p-5 bg-[#00A58B] text-white flex flex-col">
          <div className="text-sm">Reserve</div>
          <div className="text-3xl font-semibold mt-2">{totals.reserve}</div>
        </div>

        <div className="rounded-lg p-5 bg-[#E84E4E] text-white flex flex-col">
          <div className="text-sm">Cancel</div>
          <div className="text-3xl font-semibold mt-2">{totals.cancel}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setTab("overview")}
              className={`text-sm px-3 py-1 rounded ${
                tab === "overview" ? "text-blue-600 font-semibold" : "text-gray-600"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setTab("create")}
              className={`text-sm px-3 py-1 rounded ${
                tab === "create" ? "text-blue-600 font-semibold" : "text-gray-600"
              }`}
            >
              Create
            </button>
          </div>
        </div>

        {tab === "overview" && (
          <div className="space-y-4">
            {concerts.map((c) => (
              <Cardconcerts key={c.id} concert={c} onDelete={handleDeleteConcert} />
            ))}
          </div>
        )}

        {tab === "create" && (
          <div className="py-8 text-gray-600">Create form placeholder (implement later)</div>
        )}
      </div>
    </div>
  );
}
