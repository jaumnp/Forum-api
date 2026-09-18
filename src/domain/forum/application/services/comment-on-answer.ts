import { failure, success } from "../../../../core/either.ts";
import type { IAnswerRepository } from "../repository/answer-repository.ts";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";
import { AnswerComment } from "../../enterprise/entities/answer-comment.ts";
import type { IAnswerCommentsRepository } from "../repository/answer-comment-repository.ts";
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found-error.ts";

interface CommentOnAnswerRequest {
  authorId: string;
  answerId: string;
  content: string;
}

export class CommentOnAnswer {
  constructor(
    private answersRepository: IAnswerRepository,
    private answerCommentsRepository: IAnswerCommentsRepository,
  ) {}

  async execute({ authorId, answerId, content }: CommentOnAnswerRequest) {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return failure(new ResourceNotFoundError("Answer not found."));
    }

    const answerComment = AnswerComment.create({
      authorId: UniqueEntityId.create(authorId),
      answerId: UniqueEntityId.create(answerId),
      content,
    });

    await this.answerCommentsRepository.create(answerComment);

    return success({
      answerComment,
    });
  }
}
