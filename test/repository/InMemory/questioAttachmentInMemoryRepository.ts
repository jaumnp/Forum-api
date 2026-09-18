import type { QuestionAttachmentsRepository } from "../../../src/domain/forum/application/repository/question-attachment-repository.ts";
import type { QuestionAttachment } from "../../../src/domain/forum/enterprise/entities/question-attachment.ts";

export class QuestionAttachmentInMemoryRepository implements QuestionAttachmentsRepository {
  public items: QuestionAttachment[] = [];

  async findManyByQuestionId(questionId: string) {
    const questionAttachments = this.items.filter(
      (item) => item.questionId.toString() === questionId,
    );

    return questionAttachments;
  }

  async deleteManyByQuestionId(questionId: string) {
    const questionAttachments = this.items.filter(
      (item) => item.questionId.toString() !== questionId,
    );

    this.items = questionAttachments;
  }
}
