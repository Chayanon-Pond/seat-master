import { Controller, Get } from "@nestjs/common";
import { HistorysListAdminService } from "./route";

@Controller("api/admin/historys-list")
export class HistorysListAdminController {
    constructor(
        private readonly historysListAdminService: HistorysListAdminService
    ) {}

    @Get()
    async getHistories() {
        return await this.historysListAdminService.getHistories();
    }
}
