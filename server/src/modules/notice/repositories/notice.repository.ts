import { NoticeResponseDto } from '../dtos/notice-response.dto';
import { NoticeRepository } from 'src/modules/notice/interfaces/notice.repository.interface';
import { PrismaService } from 'src/common/services/prisma.service';
import { NoticePageDto } from 'src/modules/notice/dtos/notice-page.dto';
import { Injectable } from '@nestjs/common';
import { Notice } from '@prisma/client';

@Injectable()
export class PrismaNoticeRepository implements NoticeRepository {
  constructor(private prisma: PrismaService) {}

  async create(notice: Notice): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async update(notice: Notice): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findAll(page: number, pageSize: number): Promise<NoticePageDto> {
    const skip = (page - 1) * pageSize;

    const totalItems = await this.prisma.notice.count();

    const notices = await this.prisma.notice.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: skip,
      take: pageSize,
    });

    const noticesDto = notices.map(
      (notice) =>
        ({
          id: notice.id,
          title: notice.title,
          message: notice.message,
          createdAt: notice.createdAt,
          authorId: notice.authorId,
          author: {
            id: notice.author.id,
            name: notice.author.name,
            username: notice.author.username,
            role: notice.author.role,
          },
        }) as NoticeResponseDto,
    );

    return {
      total: totalItems,
      notices: noticesDto,
    };
  }

  async findById(noticeId: number): Promise<Notice> {
    throw new Error('Method not implemented.');
  }

  async deleteById(noticeId: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
