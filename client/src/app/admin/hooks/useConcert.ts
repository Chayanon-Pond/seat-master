import { useEffect , useCallback, useState } from "react";
import axios from "axios";

interface Concert {
    id: string;
    name: string;
    description: string;
    seat: number;
    available_seats: number;
    reserved_seats: number;
    cancelled_seats: number;
    created_at: string;
    updated_at: string;
}

export default function useConcert() {
    const [concerts, setConcerts] = useState<Concert[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchConcerts = useCallback(async () => {
        try {
            const response = await axios.get<Concert[]>("http://localhost:5000/api/admin/concerts");
            setConcerts(response.data);
        } catch (error) {
            setError("Failed to fetch concerts");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchConcerts();
    }, [fetchConcerts]);

    return { concerts, loading, error };
}
