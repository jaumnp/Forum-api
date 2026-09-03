import type { IPaginationParams } from "../../../../core/repository/pagination-params.ts";
import { QuestionComment } from "../../enterprise/entities/question-comment.ts";

export interface IQuestionCommentsRepository {
  findById(id: string): Promise<QuestionComment | null>;
  findManyByQuestionId(
    questionId: string,
    params: IPaginationParams,
  ): Promise<QuestionComment[]>;
  create(questionComment: QuestionComment): Promise<void>;
  delete(questionComment: QuestionComment): Promise<void>;
}
