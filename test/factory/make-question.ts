import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "../../src/core/entities/unique-entity-id.ts";
import {
  Question,
  type IQuestionProps,
} from "../../src/domain/forum/enterprise/entities/question.ts";

export function makeQuestion(
  override?: Partial<IQuestionProps>,
  id?: UniqueEntityId,
) {
  const question = Question.create(
    {
      authorId: UniqueEntityId.create(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return question;
}
