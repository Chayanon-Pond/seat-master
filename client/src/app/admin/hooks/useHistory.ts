import { useEffect , useCallback, useState } from "react";
import { getBangkokFormattedString } from "@/utils/bangkokTime";
import axios from "axios";

interface History {
    id: string;
    concert_name: string;
    username: string;
    action: string;
    created_at: string;
}

interface PaginationData {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
}

export const useHistory = () => {
    const [histories, setHistories] = useState<History[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<PaginationData>({
        totalItems: 0,
        totalPages: 0,
        currentPage: 1,
        limit: 20,
    });
    const itemsPerPage = 20;

    const fetchHistories = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const API_URL = (process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000").replace(/\/$/, "");
            const response = await axios.get(`${API_URL}/api/admin/historys-list`);
            const allData = response.data as History[];
            const totalPages = Math.ceil(allData.length / itemsPerPage);
            
            // Get histories for current page
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedHistories = allData.slice(startIndex, endIndex);
            
            const formattedData = paginatedHistories.map(history => ({
                ...history,
                created_at: getBangkokFormattedString(history.created_at),
            }));
            setHistories(formattedData);
            setPagination({
                totalItems: allData.length,
                totalPages: totalPages,
                currentPage: currentPage,
                limit: itemsPerPage,
            });
        }
        catch (err) {
            setError('Failed to fetch histories');
        }
        finally {
            setIsLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        fetchHistories();
    }, [fetchHistories]);
    
    return { 
        histories, 
        isLoading, 
        error, 
        fetchHistories,
        currentPage,
        setCurrentPage,
        totalPages: pagination.totalPages,
        totalItems: pagination.totalItems,
    };
};