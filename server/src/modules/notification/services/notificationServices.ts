import { NotificationMapper } from '../mappers/notificationMappers';
import { CreateNotificationDto } from '../dtos/createNotificationDTO';
import { NotificationRepository } from '../interfaces/notificationRepositoryInterface';
import { NotificationNotFoundException } from '../domain/exceptions/notificationNotFoundException';
import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  constructor(private notificationRepository: NotificationRepository) {}

  @OnEvent('notification.create')
  async createNotification(createNotificationDto: CreateNotificationDto): Promise<void> {
    const notification = NotificationMapper.toEntity(createNotificationDto);
    await this.notificationRepository.create(notification);
  }

  async getAllNotifications(recipientId: number): Promise<CreateNotificationDto[]> {
    const notifications = await this.notificationRepository.findAll(recipientId);
    return notifications.map((notification) => NotificationMapper.toDto(notification));
  }

  async getNotificationById(notificationId: number): Promise<CreateNotificationDto> {
    const notification = await this.notificationRepository.findById(notificationId);
    if (!notification) {
      throw new NotificationNotFoundException(`Notification with id ${notificationId} not found`);
    }
    return NotificationMapper.toDto(notification);
  }

  async getUnreadCount(recipientId: number): Promise<number> {
    return await this.notificationRepository.getUnreadCount(recipientId);
  }

  async markAllAsRead(recipientId: number): Promise<void> {
    await this.notificationRepository.markAllAsRead(recipientId);
  }

  async markAsRead(notificationId: number): Promise<void> {
    const existingNotification = await this.notificationRepository.findById(notificationId);
    if (!existingNotification) {
      throw new NotificationNotFoundException(`Notification with id ${notificationId} not found`);
    }
    await this.notificationRepository.markAsRead(notificationId);
  }
}
