import type { IAnswerRepository } from "../repository/answer-repository.ts";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";
import { AnswerComment } from "../../enterprise/entities/answer-comment.ts";
import type { IAnswerCommentsRepository } from "../repository/answer-comment-repository.ts";

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
      throw new Error("Answer not found.");
    }

    const answerComment = AnswerComment.create({
      authorId: UniqueEntityId.create(authorId),
      answerId: UniqueEntityId.create(answerId),
      content,
    });

    await this.answerCommentsRepository.create(answerComment);

    return {
      answerComment,
    };
  }
}
