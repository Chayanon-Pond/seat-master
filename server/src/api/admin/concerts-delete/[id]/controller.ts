import { Controller, Delete, Param } from "@nestjs/common";
import { ConcertDeleteAdminService } from "./route";

@Controller("api/admin/concerts-delete")
export class ConcertDeleteAdminController {
    constructor(
        private readonly concertDeleteAdminService: ConcertDeleteAdminService
    ) {}
    @Delete(":id")
    async deleteConcert(@Param("id") id: string) {
        return this.concertDeleteAdminService.deleteConcert(id);
    }
}