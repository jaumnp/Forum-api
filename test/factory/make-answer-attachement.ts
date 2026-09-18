import { UniqueEntityId } from "../../src/core/entities/unique-entity-id.ts";
import {
  AnswerAttachment,
  type AnswerAttachmentProps,
} from "../../src/domain/forum/enterprise/entities/answer-attachment.ts";

export function makeAnswerAttachment(
  override: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const answerAttachment = AnswerAttachment.create(
    {
      answerId: UniqueEntityId.create(),
      attachmentId: UniqueEntityId.create(),
      ...override,
    },
    id,
  );

  return answerAttachment;
}
