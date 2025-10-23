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
import { Reserve } from "../types/reserve";

interface PaginationData {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

interface ReserveContextType {
  reserves: Reserve[];
  isLoading: boolean;
  error: string | null;
  fetchReserves: () => Promise<void>;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const ReserveContext = createContext<ReserveContextType | undefined>(undefined);

export const ReserveProvider = ({ children }: { children: ReactNode }) => {
  const [reserves, setReserves] = useState<Reserve[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationData>({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 9,
  });
  const reservesPerPage = 9;

  const fetchReserves = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/reserves`);
      if (!response.ok) {
        throw new Error("Failed to fetch reserves");
      }
      const allData = await response.json();

      const items = Array.isArray(allData)
        ? allData
        : Array.isArray(allData.reserves)
        ? allData.reserves
        : [];

      const totalPages = Math.ceil(items.length / reservesPerPage) || 0;
      const startIndex = (currentPage - 1) * reservesPerPage;
      const endIndex = startIndex + reservesPerPage;
      const paginated = items.slice(startIndex, endIndex);

      setReserves(paginated);
      setPagination({
        totalItems: items.length,
        totalPages,
        currentPage,
        limit: reservesPerPage,
      });
    } catch (err: any) {
      setError(err?.message || "An unknown error occurred");
      console.error("Error fetching reserves:", err);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, reservesPerPage]);
  useEffect(() => {
    fetchReserves();
  }, [fetchReserves]);
  const value = useMemo(
    () => ({
      reserves,
      isLoading,
      totalPages: pagination.totalPages,
      currentPage,
      error,
      fetchReserves,
      setCurrentPage,
    }),
    [
      reserves,
      isLoading,
      pagination.totalPages,
      currentPage,
      error,
      fetchReserves,
      setCurrentPage,
    ]
  );

  return (
    <ReserveContext.Provider value={value}>{children}</ReserveContext.Provider>
  );
};

export const useReserveContext = () => {
  const context = useContext(ReserveContext);
  if (!context) {
    throw new Error("useReserveContext must be used within a ReserveProvider");
  }
  return context;
};
