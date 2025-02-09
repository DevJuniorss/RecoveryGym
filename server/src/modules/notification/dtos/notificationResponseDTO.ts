import { NotificationType } from "../domain/enums/notificationType";

export class NotificationResponseDto {
    id: number;
    message: string;
    isRead: boolean;
    type: NotificationType;
    createdAt: Date;
    recipient: {
      id: number;
      name: string;
    };
  }