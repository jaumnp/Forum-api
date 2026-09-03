import type { IPaginationParams } from "../../../src/core/repository/pagination-params.ts";
import type { IAnswerCommentsRepository } from "../../../src/domain/forum/application/repository/answer-comment-repository.ts";
import { AnswerComment } from "../../../src/domain/forum/enterprise/entities/answer-comment.ts";

export class AnswerCommentInMemoryRepository implements IAnswerCommentsRepository {
  public items: AnswerComment[] = [];

  async findById(id: string) {
    const answerComment = this.items.find((item) => item.id.toString() === id);

    if (!answerComment) {
      return null;
    }

    return answerComment;
  }

  async findManyByAnswerId(answerId: string, { page }: IPaginationParams) {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20);

    return answerComments;
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment);
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === answerComment.id,
    );

    this.items.splice(itemIndex, 1);
  }
}
