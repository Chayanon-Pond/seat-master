"use client";

import React, { useCallback, useEffect, Suspense, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Seatmaster from "../components/Seatmaster";
import Pagination from "../components/Pagination";
import { useConcertsContext } from "../context/concertContext";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    concerts,
    isLoading,
    error,
    currentPage,
    totalPages,
    fetchConcerts,
    handleDeleteConcert,
    setCurrentPage,
  } = useConcertsContext();

  useEffect(() => {
    const shouldRefetch = searchParams.get("refetch") === "true";
    if (shouldRefetch) {
      fetchConcerts();
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, [searchParams, fetchConcerts]);

  const handlePageChange = useCallback(
    (id: number) => {
      router.push(`/admin/dashboard?page=${id}`);
    },
    [router]
  );

  const handleCreateConcert = useCallback(() => {
    router.push("/admin/dashboard/create");
  }, [router]);

  const formatDate = useCallback((dateString: string): string => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return `${date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })} ${date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}`;
    } catch (e) {
      console.error("Error formatting date:", dateString, e);
      return dateString;
    }
  }, []);

  return (
    <div className="bg-gray-100 flex flex-col flex-1 min-h-screen">
      <div>
        <Seatmaster />
      </div>
      <div>
        {!isLoading && !error && concerts.length === 0 && (
          <div className="px-6 py-10 text-center text-gray-500 bg-white shadow-md rounded-lg">
            No concerts found.
          </div>
        )}

        {totalPages > 0 && (
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(id: number) => {
                setCurrentPage(id);
                handlePageChange(id);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardContent;
