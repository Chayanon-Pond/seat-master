import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../../../lib/database/database.service";

@Injectable()
export class BookingsStatsAdminService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getStats() {
    try {
      const resReserved = await this.databaseService.query(
        `SELECT COUNT(*)::int AS count FROM bookings WHERE status = 'reserved'`
      );
      const resCancelled = await this.databaseService.query(
        `SELECT COUNT(*)::int AS count FROM bookings WHERE status = 'cancelled'`
      );
      const reserved = resReserved?.[0]?.count ?? 0;
      const cancelled = resCancelled?.[0]?.count ?? 0;
      return { reserved, cancelled };
    } catch (err) {
      console.warn('BookingsStatsAdminService.getStats: failed, returning zeros', err?.message || err);
      return { reserved: 0, cancelled: 0 };
    }
  }
}
