import { failure, success } from "../../../../core/either.ts";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";
import { QuestionAttachmentList } from "../../enterprise/entities/queation-attachment-list.ts";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment.ts";
import { Question } from "../../enterprise/entities/question.ts";
import type { IQuestionRepository } from "../repository/question-repository.ts";
import { ContentLengthError } from "./errors/content-length-error.ts";

interface ICreateQuestionRequest {
  authorId: string;
  title: string;
  content: string;
  attachmentsId: string[];
}

export class CreateQuestion {
  constructor(private repository: IQuestionRepository) {}

  async execute({
    authorId,
    title,
    content,
    attachmentsId,
  }: ICreateQuestionRequest) {
    if (content.length > 2400) return failure(new ContentLengthError());

    const question = Question.create({
      authorId: UniqueEntityId.create(authorId),
      title,
      content,
    });

    const attachments = attachmentsId.map((attachment) =>
      QuestionAttachment.create({
        attachmentId: UniqueEntityId.create(attachment),
        questionId: question.id,
      }),
    );

    question.attachments = new QuestionAttachmentList(attachments);

    await this.repository.create(question);

    return success({ question });
  }
}
