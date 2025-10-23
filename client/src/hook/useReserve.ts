import { useEffect , useCallback, useState } from "react";
import axios from "axios";

interface Reserve {
    id: string;
    concert_id: string;
    username: string;
    seat_number: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export default function useReserve() {
    const [reserves, setReserves] = useState<Reserve[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchReserves = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:5000/api/admin/concerts");
            setReserves(response.data);
        } catch (err) {
            setError("Failed to fetch reserves");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchReserves();
    }, [fetchReserves]);

    return { reserves, loading, error };
}
