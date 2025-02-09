import { PrismaService } from 'src/common/services/prisma.service';
import { Module } from '@nestjs/common';
import { NoticeController } from './controllers/notice.controller';
import { NoticeService } from './services/notice.service';
import { NoticeRepository } from './interfaces/notice.repository.interface';
import { PrismaNoticeRepository } from './repositories/notice.repository';

@Module({
  imports: [],
  controllers: [NoticeController],
  providers: [
    NoticeService,
    PrismaService,
    {
      provide: NoticeRepository,
      useClass: PrismaNoticeRepository,
    },
  ],
})
export class NoticeModule {}
