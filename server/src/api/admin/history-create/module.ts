import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../../lib/database/database.module";
import { HistoryCreateAdminService } from "./route";
import { HistoryCreateAdminController } from "./controller";

@Module({
  imports: [DatabaseModule],
  providers: [HistoryCreateAdminService],
  controllers: [HistoryCreateAdminController],
})
export class HistoryCreateAdminModule {}
