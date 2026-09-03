import type { IQuestionCommentsRepository } from "../repository/questio-comment-repository.ts";

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
      throw new Error("Answer comment not found.");
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error("Not allowed");
    }

    await this.questionCommentsRepository.delete(questionComment);

    return {};
  }
}
