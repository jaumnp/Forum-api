import type { Answer } from "../../enterprise/entities/answer.ts";

export interface IAnswerRepository {
  findAll(): Promise<Answer[] | null>;
  findById(id: string): Promise<Answer | null>;
  findBySlug(slug: string): Promise<Answer | null>;
  create(question: Answer): Promise<void>;
  delete(question: Answer): Promise<void>;
}
