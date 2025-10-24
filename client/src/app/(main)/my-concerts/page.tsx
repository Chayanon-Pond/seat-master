"use client";

import React, { useEffect, useMemo, useState } from "react";
import ConcertCard from "../../../components/ui/CardReserve";
import useConcert from "../../admin/hooks/useConcert";
import Pagination from "../../admin/components/Pagination";
import { CustomToast_Notification } from "../../../components/ui/CustomToast";
import { useReserveContext } from "../../../context/reserveContext";
import ConfirmModal from "../../../components/ConfirmModal";

function MyConcertsPage() {
  const { concerts, loading, error } = useConcert();

  const reserveContext = useReserveContext();
  const { reservedMap, ensureConcerts, reserve, cancel } = reserveContext;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedCancelId, setSelectedCancelId] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(concerts.length / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [currentPage, totalPages]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return concerts.slice(start, start + itemsPerPage);
  }, [concerts, currentPage]);

  useEffect(() => {
    ensureConcerts?.(paginated.map((c) => c.id));
  }, [paginated, ensureConcerts]);

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
              reserved={!!reservedMap?.[c.id]}
              onReserve={async () => {
                const ok = await reserve?.(c.id);
                if (ok)
                  CustomToast_Notification.create("Reserved successfully");
              }}
              onCancel={async () => {
                setSelectedCancelId(c.id);
                setConfirmOpen(true);
              }}
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

      <ConfirmModal
        isOpen={confirmOpen}
        title="Confirm cancellation"
        message="Are you sure you want to cancel this reservation?"
        confirmLabel="Yes, Cancel"
        cancelLabel="No"
        onCancel={() => {
          setConfirmOpen(false);
          setSelectedCancelId(null);
        }}
        onConfirm={async () => {
          if (selectedCancelId) {
            const ok = await cancel?.(selectedCancelId);
            if (ok) CustomToast_Notification.create("Cancelled successfully");
          }
          setConfirmOpen(false);
          setSelectedCancelId(null);
        }}
      />
    </div>
  );
}

export default MyConcertsPage;
