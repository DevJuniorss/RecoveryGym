import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PrismaService } from 'src/common/services/prisma.service';
import { NotificationController } from './controllers/notificationController';
import { NotificationService } from './services/notificationServices';
import { NotificationRepository } from './repositories/notificationRepository';

@Module({
    imports: [EventEmitterModule.forRoot()],
    controllers: [NotificationController],
    providers: [
        NotificationService,
        PrismaService,
        NotificationRepository
    ],
})
export class NotificationModule {}