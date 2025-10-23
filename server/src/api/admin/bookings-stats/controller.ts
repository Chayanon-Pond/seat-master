import { Controller, Get } from "@nestjs/common";
import { BookingsStatsAdminService } from "./route";

@Controller("api/admin/bookings-stats")
export class BookingsStatsAdminController {
  constructor(private readonly bookingsStatsAdminService: BookingsStatsAdminService) {}

  @Get()
  async get() {
    return await this.bookingsStatsAdminService.getStats();
  }
}
