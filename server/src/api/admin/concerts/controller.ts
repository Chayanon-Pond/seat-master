import { Controller, Get } from "@nestjs/common";
import { ConcertListAdminService } from "./route";

@Controller("api/admin/concerts")
export class ConcertListAdminController {
    constructor(
        private readonly concertListAdminService: ConcertListAdminService
    ) {}

    @Get()
    async getConcerts() {
        return this.concertListAdminService.getConcerts();
    }
}