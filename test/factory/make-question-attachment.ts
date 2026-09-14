import { UniqueEntityId } from "../../src/core/entities/unique-entity-id.ts";
import {
  QuestionAttachment,
  type QuestionAttachmentProps,
} from "../../src/domain/forum/enterprise/entities/question-attachment.ts";

export function makeQuestionAttachment(
  override: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const questionAttachment = QuestionAttachment.create(
    {
      questionId: UniqueEntityId.create(),
      attachmentId: UniqueEntityId.create(),
      ...override,
    },
    id,
  );

  return questionAttachment;
}
