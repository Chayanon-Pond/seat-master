"use client";

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { Concert } from "../types";
import { CustomToast } from "@/components/ui/CustomToast";
import ConfirmModal from "@/components/ConfirmModal";

interface PaginationData {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

interface ConcertContextType {
  concerts: Concert[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  handleDeleteConcert: (id: string) => void;
  fetchConcerts: () => Promise<void>;
  setCurrentPage: (page: number) => void;
}

const ConcertContext = createContext<ConcertContextType | undefined>(undefined);

export const ConcertProvider = ({ children }: { children: ReactNode }) => {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [concertToDelete, setConcertToDelete] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationData>({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 9,
  });
  const concertPerPage = 9;

  const fetchConcerts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: concertPerPage.toString(),
      });
      const response = await fetch(`/api/concerts?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch concerts: ${response.statusText}`);
      }
      const data = await response.json();
      setConcerts(data.concerts);
      setPagination(data.pagination);
    } catch (error) {
      setError((error as Error).message);
      console.error("Error fetching concerts:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchConcerts();
  }, [fetchConcerts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [concertToDelete]);

  const handleDeleteConcert = useCallback((id: string) => {
    setConcertToDelete(id);
    setIsConfirmOpen(true);
  }, []);

  const [toast, setToast] = useState<{
    title?: string;
    description?: string;
    variant?: "default" | "success" | "error";
  } | null>(null);

  const confirmDelete = useCallback(async () => {
    if (!concertToDelete) return;
    try {
      const response = await fetch(`/api/concerts/${concertToDelete}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete concert");
      }
      setConcerts((prevConcerts) =>
        prevConcerts.filter((concert) => concert.id !== concertToDelete)
      );
      setIsConfirmOpen(false);
      setConcertToDelete(null);
      setToast({
        title: "Deleted",
        description: "Concert deleted successfully",
        variant: "success",
      });
    } catch (error) {
      setError((error as Error).message);
      setToast({
        title: "Error",
        description: (error as Error).message,
        variant: "error",
      });
      console.error("Error deleting concert:", error);
    }
  }, [concertToDelete, fetchConcerts]);

  const contextValue = useMemo(() => {
    return {
      concerts,
      isLoading,
      error,
      currentPage,
      totalPages: pagination.totalPages,
      handleDeleteConcert,
      fetchConcerts,
      setCurrentPage,
    };
  }, [
    concerts,
    isLoading,
    error,
    currentPage,
    pagination.totalPages,
    handleDeleteConcert,
    fetchConcerts,
    setCurrentPage,
  ]);

  return (
    <ConcertContext.Provider value={contextValue}>
      {children}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onConfirm={confirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
      {toast && (
        <CustomToast
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}
    </ConcertContext.Provider>
  );
};
export const useConcertsContext = () => {
  const context = useContext(ConcertContext);
  if (!context) {
    throw new Error("useConcertsContext must be used within a ConcertProvider");
  }
  return context;
};
