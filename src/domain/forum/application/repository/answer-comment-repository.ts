import type { IPaginationParams } from "../../../../core/repository/pagination-params.ts";
import { AnswerComment } from "../../enterprise/entities/answer-comment.ts";

export interface IAnswerCommentsRepository {
  findById(id: string): Promise<AnswerComment | null>;
  findManyByAnswerId(
    answerId: string,
    params: IPaginationParams,
  ): Promise<AnswerComment[]>;
  create(answerComment: AnswerComment): Promise<void>;
  delete(answerComment: AnswerComment): Promise<void>;
}
