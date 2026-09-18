import { failure, success } from "../../../../core/either.ts";
import type { IQuestionCommentsRepository } from "../repository/questio-comment-repository.ts";
import { NotAllowed } from "../../../../core/errors/errors/not-allowed-error.ts";
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found-error.ts";

interface DeleteQuestionCommentRequest {
  authorId: string;
  questionCommentId: string;
}

export class DeleteQuestionComment {
  constructor(
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async execute({ authorId, questionCommentId }: DeleteQuestionCommentRequest) {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId);

    if (!questionComment) {
      return failure(new ResourceNotFoundError("Answer comment not found."));
    }

    if (questionComment.authorId.toString() !== authorId) {
      return failure(new NotAllowed("Not allowed"));
    }

    await this.questionCommentsRepository.delete(questionComment);

    return success({});
  }
}
