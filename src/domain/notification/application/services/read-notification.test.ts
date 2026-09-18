import { NotificationsInMemoryRepository } from "../../../../../test/repository/InMemory/notificationInMemory.repository.ts";
import { ReadNotificationServices } from "./read-notification.ts";
import { makeNotification } from "../../../../../test/factory/make-notification.ts";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";
import { NotAllowed } from "../../../../core/errors/errors/not-allowed-error.ts";
import { describe, beforeEach, it, expect } from "vitest";

let notificationsInMemoryRepository: NotificationsInMemoryRepository;
let sut: ReadNotificationServices;

describe("Send Notification", () => {
  beforeEach(() => {
    notificationsInMemoryRepository = new NotificationsInMemoryRepository();
    sut = new ReadNotificationServices(notificationsInMemoryRepository);
  });

  it("should be able to read a notification", async () => {
    const notification = makeNotification();

    notificationsInMemoryRepository.create(notification);

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    });

    expect(result.isSuccess()).toBe(true);
    expect(notificationsInMemoryRepository.items[0]?.readAt).toEqual(
      expect.any(Date),
    );
  });

  it("should not be able to read a notification from another user", async () => {
    const notification = makeNotification({
      recipientId: UniqueEntityId.create("recipient-1"),
    });

    notificationsInMemoryRepository.create(notification);

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: "recipient-2",
    });

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowed);
  });
});
