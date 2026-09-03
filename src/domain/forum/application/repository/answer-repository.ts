import type { IPaginationParams } from "../../../../core/repository/pagination-params.ts";
import type { Answer } from "../../enterprise/entities/answer.ts";

export interface IAnswerRepository {
  findAll(): Promise<Answer[] | null>;
  findById(id: string): Promise<Answer | null>;
  findBySlug(slug: string): Promise<Answer | null>;
  findManyByQuestionId(
    questionId: string,
    params: IPaginationParams,
  ): Promise<Answer[]>;
  save(answer: Answer): Promise<void>;
  create(Answer: Answer): Promise<void>;
  delete(answer: Answer): Promise<void>;
}
