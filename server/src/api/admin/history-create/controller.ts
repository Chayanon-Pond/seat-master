import { Controller, Post, Body } from "@nestjs/common";
import { HistoryCreateAdminService } from "./route";

@Controller("api/admin/history-create")
export class HistoryCreateAdminController {
  constructor(private readonly historyCreateAdminService: HistoryCreateAdminService) {}

  @Post()
  async create(@Body() body: any) {
    return await this.historyCreateAdminService.createHistory(body);
  }
}
