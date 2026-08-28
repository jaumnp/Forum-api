import type { Question } from "../../enterprise/entities/question.ts";

export interface IQuestionRepository {
  findBySlug(slug: string): Promise<Question | null>;
  create(question: Question): Promise<void>;
}
