import { IsEnum, IsNotEmpty } from "class-validator";
import { NotificationType } from "../domain/enums/notificationType";

export class CreateNotificationDto {
    @IsNotEmpty()
    recipientId: number;
  
    @IsEnum(NotificationType)
    @IsNotEmpty()
    type: NotificationType;
  
    @IsNotEmpty()
    message: string;
  }