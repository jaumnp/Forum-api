import type { IAnswerCommentsRepository } from "../repository/answer-comment-repository.ts";

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
      throw new Error("Answer comment not found.");
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error("Not allowed");
    }

    await this.answerCommentsRepository.delete(answerComment);

    return {};
  }
}
