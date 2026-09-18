import { NotificationsInMemoryRepository } from "../../../../../test/repository/InMemory/notificationInMemory.repository.ts";
import { SendNotificationServices } from "./send-notification.ts";
import { describe, beforeEach, it, expect } from "vitest";

let notificationsInMemoryRepository: NotificationsInMemoryRepository;
let sut: SendNotificationServices;

describe("Send Notification", () => {
  beforeEach(() => {
    notificationsInMemoryRepository = new NotificationsInMemoryRepository();
    sut = new SendNotificationServices(notificationsInMemoryRepository);
  });

  it("should be able to send a notification", async () => {
    const result = await sut.execute({
      recipientId: "1",
      title: "Nova notificação",
      content: "Conteúdo da notificação",
    });

    expect(result.isSuccess()).toBe(true);
    expect(notificationsInMemoryRepository.items[0]).toEqual(
      result.value?.notification,
    );
  });
});
