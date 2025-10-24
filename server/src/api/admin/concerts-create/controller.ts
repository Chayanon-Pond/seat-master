import { Controller, Post, Body } from "@nestjs/common";
import { ConcertCreateAdminService } from "./route";

@Controller("api/admin/concerts-create")
export class ConcertCreateAdminController {
    constructor(
        private readonly concertCreateAdminService: ConcertCreateAdminService
    ) {
        console.log("ConcertCreateAdminController initialized");
    }

    @Post()
    async createConcert(@Body() concertData: any) {
        console.log("Received concert data:", concertData);
        return this.concertCreateAdminService.createConcert(concertData);
    }
}
