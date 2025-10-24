import { Module } from "@nestjs/common";
import { ConcertListAdminService } from "./route";
import { ConcertListAdminController } from "./controller";
import { DatabaseModule } from "../../../lib/database/database.module";

@Module({
    imports: [DatabaseModule],
    providers: [ConcertListAdminService],
    controllers: [ConcertListAdminController],
})
export class ConcertListAdminModule {}