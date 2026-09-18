import { failure, success } from "../../../../core/either.ts";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";
import { Answer } from "../../enterprise/entities/answer.js";
import type { IAnswerRepository } from "../repository/answer-repository.ts";
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found-error.ts";
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment.ts";
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachment-list.ts";

interface IAnswerQuestionRequest {
  instructorId: string;
  questionId: string;
  attachmentsIds: string[];
  content: string;
}

export class CreateAnswerQuestion {
  constructor(private repository: IAnswerRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
    attachmentsIds,
  }: IAnswerQuestionRequest) {
    const answer = Answer.create({
      authorId: UniqueEntityId.create(instructorId),
      questionId: UniqueEntityId.create(questionId),
      content,
    });

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: UniqueEntityId.create(attachmentId),
        answerId: answer.id,
      });
    });

    answer.attachments = new AnswerAttachmentList(answerAttachments);

    await this.repository.create(answer);

    return success({
      answer,
    });
  }
}
