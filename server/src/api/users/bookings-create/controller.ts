import { Controller, Post, Body } from "@nestjs/common";
import { BookingsCreateAdminService } from "./route";

@Controller("api/admin/bookings-create")
export class BookingsCreateAdminController {
  constructor(private readonly bookingsCreateAdminService: BookingsCreateAdminService) {}

  @Post()
  async create(@Body() body: any) {
    return await this.bookingsCreateAdminService.createBooking(body);
  }
}
