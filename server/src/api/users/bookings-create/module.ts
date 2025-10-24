import { Module } from "@nestjs/common";
import { BookingsCreateAdminController } from "./controller";
import { BookingsCreateAdminService } from "./route";

@Module({
  providers: [BookingsCreateAdminService],
  controllers: [BookingsCreateAdminController],
})
export class BookingsCreateAdminModule {}
