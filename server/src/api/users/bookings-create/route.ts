import { Injectable, BadRequestException } from "@nestjs/common";
import { DatabaseService } from "../../../lib/database/database.service";

@Injectable()
export class BookingsCreateAdminService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Ensure bookings table exists (safe to call repeatedly)
  private async ensureTable() {
    const createSql = `
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        concert_id INTEGER NOT NULL,
        status VARCHAR(20) DEFAULT 'reserved',
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
      )`;
    await this.databaseService.query(createSql);
  }

  async createBooking(data: { concert_id: number | string; user_id?: number; status?: string }) {
    const { concert_id, user_id = null, status = 'reserved' } = data;
    if (!concert_id) {
      throw new BadRequestException('Missing concert_id for booking');
    }

    try {
      console.log('BookingsCreate request', { concert_id, user_id, status });
      await this.ensureTable();

      const concertIdInt = Number(concert_id);

      // basic validation for status
      const allowed = ['reserved', 'cancelled'];
      const st = allowed.includes(status) ? status : 'reserved';

      const insert = `
        INSERT INTO bookings (user_id, concert_id, status, created_at, updated_at)
        VALUES ($1, $2, $3, NOW(), NOW())
        RETURNING *
      `;
      const rows = await this.databaseService.query(insert, [user_id, isNaN(concertIdInt) ? concert_id : concertIdInt, st]);
      console.log('BookingsCreate inserted rows:', rows?.length || 0, rows?.[0]);
      return rows[0];
    } catch (err: any) {
      console.error('Error creating booking:', err?.message || err);
      throw new BadRequestException('Failed to create booking: ' + (err?.message || err));
    }
  }
}
