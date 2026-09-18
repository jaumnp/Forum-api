import type { AnswerAttachmentsRepository } from "../../../src/domain/forum/application/repository/answer-attachment-repository.ts";
import type { AnswerAttachment } from "../../../src/domain/forum/enterprise/entities/answer-attachment.ts";

export class AnswerAttachmentsInMemoryRepository implements AnswerAttachmentsRepository {
  public items: AnswerAttachment[] = [];

  async findManyByAnswerId(answerId: string) {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() === answerId,
    );

    return answerAttachments;
  }

  async deleteManyByAnswerId(answerId: string) {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() !== answerId,
    );

    this.items = answerAttachments;
  }
}
