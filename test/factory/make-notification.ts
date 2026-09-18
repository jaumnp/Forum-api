import { faker } from "@faker-js/faker";

import { UniqueEntityId } from "../../src/core/entities/unique-entity-id.ts";
import { Notification } from "../../src/domain/notification/enterprise/entities/notification.ts";
import type { NotificationProps } from "../../src/domain/notification/enterprise/entities/notification.ts";

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityId,
) {
  const notification = Notification.create(
    {
      recipientId: UniqueEntityId.create(),
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(10),
      ...override,
    },
    id,
  );

  return notification;
}
