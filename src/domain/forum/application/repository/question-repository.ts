import type { IPaginationParams } from "../../../../core/repository/pagination-params.ts";
import type { Question } from "../../enterprise/entities/question.ts";

export interface IQuestionRepository {
  findAll(): Promise<Question[] | null>;
  findById(id: string): Promise<Question | null>;
  findBySlug(slug: string): Promise<Question | null>;
  findManyRecent(params: IPaginationParams): Promise<Question[]>;
  save(question: Question): Promise<void>;
  create(question: Question): Promise<void>;
  delete(question: Question): Promise<void>;
}
