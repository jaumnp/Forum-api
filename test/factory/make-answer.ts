import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "../../src/core/entities/unique-entity-id.ts";
import {
  Answer,
  type IAnswerProps,
} from "../../src/domain/forum/enterprise/entities/answer.ts";

export function makeAnswer(
  override?: Partial<IAnswerProps>,
  id?: UniqueEntityId,
) {
  const question = Answer.create(
    {
      authorId: UniqueEntityId.create(),
      questionId: UniqueEntityId.create(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return question;
}
