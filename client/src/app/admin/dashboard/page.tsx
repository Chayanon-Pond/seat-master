"use client";

import React, { useCallback, useEffect } from "react";
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
    setCurrentPage,
  } = useConcertsContext();
  const [activeTab, setActiveTab] = React.useState<"overview" | "create">(
    "overview"
  );

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


  return (
    <div className="bg-gray-100 flex flex-col flex-1 min-h-screen">
      <div>
        {activeTab === "create" ? (
          // Small/medium: centered card wrapper; Desktop: render unwrapped to preserve original layout
          <>
            <div className="lg:hidden w-full sm:max-w-[680px] sm:mx-auto sm:bg-white sm:rounded-lg sm:border sm:border-gray-200 sm:p-4 md:p-6">
              <Seatmaster onTabChange={setActiveTab} />
            </div>
            <div className="hidden lg:block">
              <Seatmaster onTabChange={setActiveTab} />
            </div>
          </>
        ) : (
          <div>
            <Seatmaster onTabChange={setActiveTab} />
          </div>
        )}
      </div>
      <div>
        {!isLoading && !error && concerts.length === 0 && (
          <div className="px-6 py-10 text-center text-gray-500 bg-white shadow-md rounded-lg">
            No concerts found.
          </div>
        )}

        {activeTab === "overview" && totalPages > 0 && (
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
