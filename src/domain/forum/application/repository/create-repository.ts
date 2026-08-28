import type { Question } from "../../enterprise/entities/question.ts";

export interface IQuestion {
  create(question: Question): Promise<void>;
}
