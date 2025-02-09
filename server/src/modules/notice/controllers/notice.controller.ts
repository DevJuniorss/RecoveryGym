import { NoticeService } from '../services/notice.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('notices')
export class NoticeController {
  constructor(private noticeService: NoticeService) {}

  @Get()
  async getAllNotices(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    const pageNumber = page ? parseInt(page) : 1;
    const pageSizeNumber = pageSize ? parseInt(pageSize) : 12;

    return await this.noticeService.getAllUsers(pageNumber, pageSizeNumber);
  }
}
