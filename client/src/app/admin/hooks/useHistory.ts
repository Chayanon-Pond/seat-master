import { useEffect , useCallback, useState } from "react";
import { getBangkokFormattedString } from "@/utils/bangkokTime";
import axios from "axios";

interface History {
    id: string;
    concertName: string;
    userName: string;
    action: string;
    createdAt: string;
}

export const useHistory = () => {
    const [histories, setHistories] = useState<History[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const fetchHistories = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get("/api/admin/historys-list");
            const data = response.data as History[];
            const formattedData = data.map(history => ({
                ...history,
                createdAt: getBangkokFormattedString(history.createdAt),
            }));
            setHistories(formattedData);
        }
        catch (err) {
            setError('Failed to fetch histories');
        }
        finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchHistories();
    }, [fetchHistories]);
    return { histories, isLoading, error, fetchHistories };
};