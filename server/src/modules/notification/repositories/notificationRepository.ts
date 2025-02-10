import { PrismaClient } from "@prisma/client";
import { Notification } from "@prisma/client";
import { CreateNotificationDto } from "../dtos/createNotificationDTO";
import { NotificationResponseDto } from "../dtos/notificationResponseDTO";

const prisma = new PrismaClient();

export class NotificationRepository {
    async create(data: CreateNotificationDto): Promise<NotificationResponseDto> {
        const notification = await prisma.notification.create({
            data: {
                recipientId: data.recipientId,
                message: data.message,
                isRead: false,
                createdAt: new Date(),
                type: data.type as any,
            },
            include: {
                recipient: true,
            },
        });

        return {
            id: notification.id,
            recipient: {
                id: notification.recipient.id,
                name: notification.recipient.name,
            },
            message: notification.message,
            isRead: notification.isRead,
            type: notification.type as any,
            createdAt: notification.createdAt,
        };
    }

    async findById(id: number): Promise<NotificationResponseDto | null> {
        const notification = await prisma.notification.findUnique({
            where: { id },
            include: { recipient: true },
        });

        if (!notification) return null;

        return {
            id: notification.id,
            recipient: {
                id: notification.recipient.id,
                name: notification.recipient.name,
            },
            message: notification.message,
            isRead: notification.isRead,
            type: notification.type as any,
            createdAt: notification.createdAt,
        };
    }

    async findAll(recipientId: number): Promise<NotificationResponseDto[]> {
        const notifications = await prisma.notification.findMany({
            where: { recipientId },
            include: { recipient: true },
            orderBy: { createdAt: "desc" },
        });

        return notifications.map(notification => ({
            id: notification.id,
            recipient: {
                id: notification.recipient.id,
                name: notification.recipient.name,
            },
            message: notification.message,
            isRead: notification.isRead,
            type: notification.type as any,
            createdAt: notification.createdAt,
        }));
    }

    async markAsRead(id: number): Promise<void> {
        await prisma.notification.update({
            where: { id },
            data: { isRead: true },
        });
    }

    async markAllAsRead(recipientId: number): Promise<void> {
        await prisma.notification.updateMany({
            where: { recipientId, isRead: false },
            data: { isRead: true },
        });
    }

    async getUnreadCount(recipientId: number): Promise<number> {
        return await prisma.notification.count({
            where: { recipientId, isRead: false },
        });
    }

    async delete(id: number): Promise<void> {
        await prisma.notification.delete({
            where: { id },
        });
    }
}
