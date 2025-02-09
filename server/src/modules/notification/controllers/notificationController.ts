import { Controller, Param, Patch, Post, Body, Get } from '@nestjs/common';
import { CreateNotificationDto } from '../dtos/createNotificationDTO';
import { CurrentUserId } from 'src/common/decorators/current-user-id.decorator';
import { NotificationService } from '../services/notificationServices';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async getAllNotifications(@CurrentUserId() userId: number) {
    return this.notificationService.getAllNotifications(userId);
  }

  @Get('unread-count')
  async getUnreadCount(@CurrentUserId() userId: number) {
    return await this.notificationService.getUnreadCount(userId);
  }

  @Get(':id')
  async getNotification(@Param('id') id: string) {
    const notificationId = parseInt(id);
    return this.notificationService.getNotificationById(notificationId);
  }

  @Post()
  async createNotification(@Body() createNotificationDto: CreateNotificationDto) {
    await this.notificationService.createNotification(createNotificationDto);
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    const notificationId = parseInt(id);
    await this.notificationService.markAsRead(notificationId);
  }

  @Patch('read-all')
  async markAllAsRead(@CurrentUserId() userId: number) {
    await this.notificationService.markAllAsRead(userId);
  }
}
