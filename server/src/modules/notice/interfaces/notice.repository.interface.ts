import { Notice } from '@prisma/client';
import { NoticePageDto } from '../dtos/notice-page.dto';

export abstract class NoticeRepository {
  abstract create(notice: Notice): Promise<void>;
  abstract update(notice: Notice): Promise<void>;
  abstract findAll(page: number, pageSize: number): Promise<NoticePageDto>;
  abstract findById(noticeId: number): Promise<Notice>;
  abstract deleteById(noticeId: number): Promise<void>;
}
