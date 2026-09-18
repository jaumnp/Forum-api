import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";
import { success } from "../../../../core/either.ts";
import { Notification } from "../../enterprise/entities/notification.ts";
import type { NotificationsRepository } from "../repositories/notifications-repository.ts";

interface SendNotificationServicesRequest {
  recipientId: string;
  title: string;
  content: string;
}

export class SendNotificationServices {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationServicesRequest) {
    const notification = Notification.create({
      recipientId: UniqueEntityId.create(recipientId),
      title,
      content,
    });

    await this.notificationsRepository.create(notification);

    return success({
      notification,
    });
  }
}
