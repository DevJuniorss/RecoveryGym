import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notificationRepository';
import { CreateNotificationDto } from '../dtos/createNotificationDTO';
import { NotificationNotFoundException } from '../domain/exceptions/notificationNotFoundException';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async createNotification(createNotificationDto: CreateNotificationDto) {
    return await this.notificationRepository.create(createNotificationDto);
  }

  async getNotificationById(notificationId: number) {
    const notification = await this.notificationRepository.findById(notificationId);
    if (!notification) {
      throw new NotificationNotFoundException(
        `Notification with ID ${notificationId} not found`,
      );
    }
    return notification;
  }

  async getAllNotifications(recipientId: number) {
    return await this.notificationRepository.findAll(recipientId);
  }

  async markAsRead(notificationId: number) {
    const notification = await this.notificationRepository.findById(notificationId);
    if (!notification) {
      throw new NotificationNotFoundException(
        `Notification with ID ${notificationId} not found`,
      );
    }
    await this.notificationRepository.markAsRead(notificationId);
  }

  async markAllAsRead(recipientId: number) {
    await this.notificationRepository.markAllAsRead(recipientId);
  }

  async getUnreadCount(recipientId: number) {
    return await this.notificationRepository.getUnreadCount(recipientId);
  }
}