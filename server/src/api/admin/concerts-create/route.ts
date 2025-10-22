import { Injectable, BadRequestException } from "@nestjs/common";
import { DatabaseService } from "../../../lib/database/database.service";

@Injectable()
export class ConcertCreateAdminService {
    constructor(
        private readonly databaseService: DatabaseService
    ) {}

    async createConcert(concertData: {
        name: string;
        description: string;
        seat: number;
    }) {
        const { name, description, seat } = concertData;
        
        // Validation
        if (!name || !description || !seat || seat <= 0) {
            throw new BadRequestException("Invalid concert data");
        }

        try {
            const query = `
                INSERT INTO concerts (name, description, seat, available_seats, reserved_seats, cancelled_seats, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
                RETURNING *
            `;
            const result = await this.databaseService.query(query, [
                name,
                description,
                seat,
                seat, // available_seats = total seats initially
                0,    // reserved_seats
                0     // cancelled_seats
            ]);
            return result[0];
        } catch (error) {
            console.error("Error creating concert:", error);
            throw new BadRequestException("Failed to create concert: " + error.message);
        }
    }
}