import { Module } from "@nestjs/common";
import { ConcertDeleteAdminService } from "./route";
import { ConcertDeleteAdminController } from "./controller";
import { DatabaseModule } from "../../../../lib/database/database.module";

@Module({
    imports: [DatabaseModule],
    providers: [ConcertDeleteAdminService],
    controllers: [ConcertDeleteAdminController],
})
export class ConcertDeleteAdminModule {}