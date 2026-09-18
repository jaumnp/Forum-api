import { failure, success } from "../../../../core/either.ts";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list.ts";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment.ts";
import type { QuestionAttachmentsRepository } from "../repository/question-attachment-repository.ts";
import type { IQuestionRepository } from "../repository/question-repository.ts";
import { NotAllowed } from "../../../../core/errors/errors/not-allowed-error.ts";
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found-error.ts";

interface IEditQuestionRequest {
  questionId: string;
  authorId: string;
  title: string;
  content: string;
  attachmentsId: string[];
}

export class EditQuestion {
  constructor(
    private questionRepository: IQuestionRepository,
    private attachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async execute({
    questionId,
    authorId,
    title,
    content,
    attachmentsId,
  }: IEditQuestionRequest) {
    const question = await this.questionRepository.findById(questionId);

    if (!question)
      return failure(new ResourceNotFoundError("Question not found!"));

    if (authorId !== question.authorId.toString())
      return failure(new NotAllowed("Author incorrect!"));

    const currentAttachments =
      await this.attachmentsRepository.findManyByQuestionId(questionId);

    const questionAttachmentList = new QuestionAttachmentList(
      currentAttachments,
    );

    const questionAttachments = attachmentsId.map((attachment) =>
      QuestionAttachment.create({
        attachmentId: UniqueEntityId.create(attachment),
        questionId: question.id,
      }),
    );

    questionAttachmentList.update(questionAttachments);

    question.title = title;
    question.content = content;
    question.attachments = questionAttachmentList;

    await this.questionRepository.save(question);

    return success({ message: "Question edited successfully!" });
  }
}
