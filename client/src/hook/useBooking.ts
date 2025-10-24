import { useState, useEffect, useCallback } from "react";

type Stats = { reserved: number; cancelled: number };

export default function useBooking() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:5000";

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND}/api/admin/bookings-stats`);
      if (!res.ok) throw new Error(`status:${res.status}`);
      const data = await res.json();
      setStats({ reserved: Number(data.reserved ?? 0), cancelled: Number(data.cancelled ?? 0) });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err ?? "Failed to fetch bookings stats");
      setError(msg);
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, [BACKEND]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refresh: fetchStats } as const;
}
