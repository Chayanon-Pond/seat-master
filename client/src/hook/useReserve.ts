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

    const BACKEND = (process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000").replace(/\/$/, "");

    const fetchReserves = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${BACKEND}/api/admin/concerts`);
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
