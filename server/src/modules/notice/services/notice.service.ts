import { NoticePageDto } from '../dtos/notice-page.dto';
import { NoticeRepository } from '../interfaces/notice.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NoticeService {
  constructor(private noticeRepository: NoticeRepository) {}

  async getAllUsers(
    page: number = 1,
    pageSize: number = 6,
  ): Promise<NoticePageDto> {
    return await this.noticeRepository.findAll(page, pageSize);
  }
}
