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
  setPage: (page: number) => void;
  handleDeleteConcert: (id: string) => Promise<void>;
  fetchConcerts: () => Promise<void>;
}

const ConcertContext = createContext<ConcertContextType | undefined>(undefined);

export const ConcertProvider = ({ children }: { children: ReactNode }) => {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
};
