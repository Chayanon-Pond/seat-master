import { Injectable, BadRequestException } from "@nestjs/common";
import { DatabaseService } from "../../../lib/database/database.service";

@Injectable()
export class HistoryCreateAdminService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createHistory(data: { concert_id: string; username: string; action: string }) {
    const { concert_id, username, action } = data;
    if (!concert_id || !username || !action) {
      throw new BadRequestException("Missing required history fields");
    }

    try {
      console.log("HistoryCreate request", { concert_id, username, action });

      // normalize concert id to integer when possible for DB lookup
      const concertIdInt = Number(concert_id);

      // lookup concert name
      const concertRows = await this.databaseService.query(
        `SELECT name FROM concerts WHERE id = $1`,
        [isNaN(concertIdInt) ? concert_id : concertIdInt]
      );
      let concertName = concertRows && concertRows.length > 0 ? concertRows[0].name : null;
      if (!concertName) {
        console.warn(`HistoryCreate: concert name not found for id=${concert_id}, falling back to 'Unknown concert'`);
        concertName = "Unknown concert";
      }

      // resolve user id; since there's only one user in your setup, fall back to first user
      let userId: number | null = null;
      let resolvedUsername = username;
      try {
        const userRows = await this.databaseService.query(`SELECT id, username FROM users WHERE username = $1`, [username]);
        if (userRows && userRows.length > 0) {
          userId = userRows[0].id;
          resolvedUsername = userRows[0].username;
        } else {
          const firstUser = await this.databaseService.query(`SELECT id, username FROM users LIMIT 1`);
          if (firstUser && firstUser.length > 0) {
            userId = firstUser[0].id;
            resolvedUsername = firstUser[0].username;
            console.warn(`HistoryCreate: username '${username}' not found, using first user id=${userId}`);
          }
        }
      } catch (uerr) {
        console.warn("HistoryCreate: failed to resolve user, continuing without user_id", uerr);
      }

      const insertQuery = `
        INSERT INTO history (user_id, concert_id, concert_name, username, action, created_at)
        VALUES ($1, $2, $3, $4, $5, NOW())
        RETURNING *
      `;
      const result = await this.databaseService.query(insertQuery, [userId, isNaN(concertIdInt) ? concert_id : concertIdInt, concertName, resolvedUsername, action]);
      return result[0];
    } catch (err: any) {
      console.error("Error creating history:", err?.message || err);
      throw new BadRequestException("Failed to create history: " + (err?.message || err));
    }
  }
}
