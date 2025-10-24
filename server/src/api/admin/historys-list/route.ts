import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../../../lib/database/database.service";

@Injectable()
export class HistorysListAdminService {
    constructor(
        private readonly databaseService: DatabaseService
    ) {}

    async getHistories() {
        const histories = await this.databaseService.query("SELECT * FROM history");
        if (!histories || histories.length === 0) {
            throw new NotFoundException("No histories found");
        }
        return histories;
    }
}