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
  // reservation UI state and actions
  reservedMap?: Record<string, boolean>;
  ensureConcerts?: (ids: string[]) => void;
  reserve?: (concertId: string) => Promise<boolean>;
  cancel?: (concertId: string) => Promise<boolean>;
}

const ReserveContext = createContext<ReserveContextType | undefined>(undefined);

export const ReserveProvider = ({ children }: { children: ReactNode }) => {
  const [reserves, setReserves] = useState<Reserve[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [reservedMap, setReservedMap] = useState<Record<string, boolean>>(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("reservedMap") : null;
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.warn("Failed to read reservedMap from localStorage", e);
      return {};
    }
  });
  const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:5000";

  const ensureConcerts = useCallback((ids: string[]) => {
    setReservedMap((m) => {
      const copy = { ...m };
      for (const id of ids) {
        if (typeof copy[id] === "undefined") copy[id] = false;
      }
      return copy;
    });
  }, []);

  const reserve = useCallback(async (concertId: string) => {
    try {
      const res = await fetch(`${BACKEND}/api/admin/history-create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concert_id: concertId, username: "user", action: "Reserved" }),
      });
      if (!res.ok) throw new Error(`status:${res.status}`);
  setReservedMap((m) => ({ ...m, [concertId]: true }));
      return true;
    } catch (err) {
      console.error("reserve failed", err);
      return false;
    }
  }, []);

  const cancel = useCallback(async (concertId: string) => {
    try {
      const res = await fetch(`${BACKEND}/api/admin/history-create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concert_id: concertId, username: "user", action: "Cancelled" }),
      });
      if (!res.ok) throw new Error(`status:${res.status}`);
  setReservedMap((m) => ({ ...m, [concertId]: false }));
      return true;
    } catch (err) {
      console.error("cancel failed", err);
      return false;
    }
  }, []);

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
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:5000";
      const response = await fetch(`${BACKEND}/api/admin/concerts`);
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
      reservedMap,
      ensureConcerts,
      reserve,
      cancel,
    }),
    [
      reserves,
      isLoading,
      pagination.totalPages,
      currentPage,
      error,
      fetchReserves,
      setCurrentPage,
      reservedMap,
      ensureConcerts,
      reserve,
      cancel,
    ]
  );
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("reservedMap", JSON.stringify(reservedMap));
      }
    } catch (e) {
      console.warn("Failed to persist reservedMap to localStorage", e);
    }
  }, [reservedMap]);

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
