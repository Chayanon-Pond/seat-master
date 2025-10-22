import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../../../../lib/database/database.service";

@Injectable()

export class ConcertDeleteAdminService {
    constructor(
        private readonly databaseService: DatabaseService
    ) {}
    async deleteConcert(id: string) {
        const result = await this.databaseService.query("DELETE FROM concerts WHERE id = $1", [id]);
        if (!result || result.length === 0) {
            throw new NotFoundException(`Concert with ID ${id} not found`);
        }
    }
}