import { faker } from "@faker-js/faker";

import { UniqueEntityId } from "../../src/core/entities/unique-entity-id.ts";

import {
  AnswerComment,
  type IAnswerCommentProps,
} from "../../src/domain/forum/enterprise/entities/answer-comment.ts";

export function makeAnswerComment(
  override: Partial<IAnswerCommentProps> = {},
  id?: UniqueEntityId,
) {
  const answer = AnswerComment.create(
    {
      authorId: UniqueEntityId.create(),
      answerId: UniqueEntityId.create(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return answer;
}
