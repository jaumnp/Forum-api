import type { IPaginationParams } from "../../../../core/repository/pagination-params.ts";
import type { Answer } from "../../enterprise/entities/answer.ts";

export interface IAnswerRepository {
  findById(id: string): Promise<Answer | null>;
  findManyByQuestionId(
    questionId: string,
    params: IPaginationParams,
  ): Promise<Answer[]>;
  create(answer: Answer): Promise<void>;
  save(answer: Answer): Promise<void>;
  delete(answer: Answer): Promise<void>;
}
