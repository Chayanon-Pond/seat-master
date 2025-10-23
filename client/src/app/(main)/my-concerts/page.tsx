"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import ConcertCard from "../../../components/ui/CardReserve";
import useConcert from "../../admin/hooks/useConcert";
import Pagination from "../../admin/components/Pagination";
import { CustomToast_Notification } from "../../../components/ui/CustomToast";

function MyConcertsPage() {
  const { concerts, loading, error } = useConcert();

  const handleReserve = useCallback((concertId: string) => {
    // Placeholder: show toast. Replace with real reserve API call when backend exists.
    CustomToast_Notification.create("Reserved successfully");
    console.log("Reserve clicked for", concertId);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.max(1, Math.ceil(concerts.length / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [currentPage, totalPages]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return concerts.slice(start, start + itemsPerPage);
  }, [concerts, currentPage]);

  return (
    <div className=" mx-auto px-4 py-6">
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="flex flex-col">
        {paginated.length === 0 && !loading && (
          <div className="text-gray-600">No concerts found.</div>
        )}

        {paginated.map((c) => (
          <div key={c.id} className="w-full">
            <ConcertCard
              title={c.name}
              description={c.description}
              seats={c.available_seats ?? c.seat}
              reserved={false}
              onReserve={() => handleReserve(c.id)}
            />
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={
            concerts.length === 0
              ? 0
              : Math.ceil(concerts.length / itemsPerPage)
          }
          onPageChange={(p) => setCurrentPage(p)}
        />
      </div>
    </div>
  );
}

export default MyConcertsPage;
