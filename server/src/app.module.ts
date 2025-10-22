import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './lib/database/database.module';
import { HistorysListAdminModule } from './api/admin/historys-list/module';
import { ConcertListAdminModule } from './api/admin/concerts/module';
import { ConcertDeleteAdminModule } from './api/admin/concerts-delete/[id]/module';
import { ConcertCreateAdminModule } from './api/admin/concerts-create/module';


@Module({
  imports: [
    DatabaseModule,
    HistorysListAdminModule,
    ConcertListAdminModule,
    ConcertDeleteAdminModule,
    ConcertCreateAdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
