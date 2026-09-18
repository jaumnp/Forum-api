import { failure, success } from "../../../../core/either.ts";
import type { NotificationsRepository } from "../repositories/notifications-repository.ts";
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found-error.ts";
import { NotAllowed } from "../../../../core/errors/errors/not-allowed-error.ts";

interface ReadNotificationServicesRequest {
  recipientId: string;
  notificationId: string;
}

export class ReadNotificationServices {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    notificationId,
  }: ReadNotificationServicesRequest) {
    const notification =
      await this.notificationsRepository.findById(notificationId);

    if (!notification) {
      return failure(new ResourceNotFoundError());
    }

    if (recipientId !== notification.recipientId.toString()) {
      return failure(new NotAllowed());
    }

    notification.read();

    await this.notificationsRepository.save(notification);

    return success({ notification });
  }
}
