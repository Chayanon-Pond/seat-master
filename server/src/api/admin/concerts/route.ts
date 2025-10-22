import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../../../lib/database/database.service";

@Injectable()
export class ConcertListAdminService {
    constructor(
        private readonly databaseService: DatabaseService
    ) {}
    async getConcerts() {
        const concerts = await this.databaseService.query("SELECT * FROM concerts");
        if (!concerts || concerts.length === 0) {
            throw new NotFoundException("No concerts found");
        }
        return concerts;
    }
}