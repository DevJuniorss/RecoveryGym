import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { NotificationController } from './controllers/notificationController';
import { NotificationService } from './services/notificationService';
import { NotificationRepository } from './repositories/notificationRepository';
import { PrismaNotificationRepository } from './repositories/prismaNotificationRepository';

@Module({
  controllers: [NotificationController],
  providers: [
    NotificationService,
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
})
export class NotificationModule {}
