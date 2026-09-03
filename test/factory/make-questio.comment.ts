import { faker } from "@faker-js/faker";

import { UniqueEntityId } from "../../src/core/entities/unique-entity-id.ts";

import {
  QuestionComment,
  type IQuestionCommentProps,
} from "../../src/domain/forum/enterprise/entities/question-comment.ts";

export function makeQuestionComment(
  override: Partial<IQuestionCommentProps> = {},
  id?: UniqueEntityId,
) {
  const question = QuestionComment.create(
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
