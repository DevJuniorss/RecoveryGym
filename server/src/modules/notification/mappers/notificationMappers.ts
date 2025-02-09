import { Notification } from "../domain/entities/notification";
import { NotificationResponseDto } from "../dtos/notificationResponseDTO";

export class NotificationMapper {
    static toDto(notification: Notification): NotificationResponseDto {
      return {
        id: notification.id,
        message: notification.message,
        isRead: notification.isRead,
        createdAt: notification.createdAt,
        recipient: {
          id: notification.recipient.id,
          name: notification.recipient.name,
        },
        type: notification.type,
      };
    }
  }