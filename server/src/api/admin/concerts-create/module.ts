import { Module } from "@nestjs/common";
import { ConcertCreateAdminService } from "./route";
import { ConcertCreateAdminController } from "./controller";
import { DatabaseModule } from "../../../lib/database/database.module";

@Module({
    imports: [DatabaseModule],
    providers: [ConcertCreateAdminService],
    controllers: [ConcertCreateAdminController],
})
export class ConcertCreateAdminModule {}
