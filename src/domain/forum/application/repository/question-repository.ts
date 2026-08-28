import type { Question } from "../../enterprise/entities/question.ts";

export interface IQuestionRepository {
  findAll(): Promise<Question[] | null>;
  findById(id: string): Promise<Question | null>;
  findBySlug(slug: string): Promise<Question | null>;
  create(question: Question): Promise<void>;
  delete(question: Question): Promise<void>;
}
