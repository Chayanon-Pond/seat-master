import { Module } from "@nestjs/common";
import { HistorysListAdminService } from "./route";
import { HistorysListAdminController } from "./controller";
import { DatabaseModule } from "../../../lib/database/database.module";

@Module({
    imports: [DatabaseModule],
    providers: [HistorysListAdminService],
    controllers: [HistorysListAdminController],
})
export class HistorysListAdminModule {}
