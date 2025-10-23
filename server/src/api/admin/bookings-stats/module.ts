import { Module } from "@nestjs/common";
import { BookingsStatsAdminController } from "./controller";
import { BookingsStatsAdminService } from "./route";

@Module({
  providers: [BookingsStatsAdminService],
  controllers: [BookingsStatsAdminController],
})
export class BookingsStatsAdminModule {}
