import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './lib/database/database.module';
import { HistorysListAdminModule } from './api/admin/historys-list/module';

@Module({
  imports: [DatabaseModule, HistorysListAdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
