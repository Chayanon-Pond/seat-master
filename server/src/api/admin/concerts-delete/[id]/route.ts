import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../../../../lib/database/database.service";

@Injectable()

export class ConcertDeleteAdminService {
    constructor(
        private readonly databaseService: DatabaseService
    ) {}
    async deleteConcert(id: string) {
        try {
            const concertId = parseInt(id, 10);
            
            if (isNaN(concertId)) {
                throw new NotFoundException(`Invalid concert ID: ${id}`);
            }

            const result = await this.databaseService.query(
                "DELETE FROM concerts WHERE id = $1 RETURNING *",
                [concertId]
            );
            
            if (!result || result.length === 0) {
                throw new NotFoundException(`Concert with ID ${concertId} not found`);
            }
            
            return { message: "Concert deleted successfully", data: result[0] };
        } catch (error) {
            console.error("Error deleting concert:", error);
            throw error;
        }
    }
}