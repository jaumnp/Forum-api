import { failure, success } from "../../../../core/either.ts";
import type { IAnswerCommentsRepository } from "../repository/answer-comment-repository.ts";
import { NotAllowed } from "../../../../core/errors/errors/not-allowed-error.ts";
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found-error.ts";

interface DeleteAnswerCommentRequest {
  authorId: string;
  answerCommentId: string;
}

export class DeleteAnswerComment {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

  async execute({ authorId, answerCommentId }: DeleteAnswerCommentRequest) {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId);

    if (!answerComment) {
      return failure(new ResourceNotFoundError());
    }

    if (answerComment.authorId.toString() !== authorId) {
      return failure(new NotAllowed());
    }

    await this.answerCommentsRepository.delete(answerComment);

    return success({ message: "Answer deleted successfully" });
  }
}
