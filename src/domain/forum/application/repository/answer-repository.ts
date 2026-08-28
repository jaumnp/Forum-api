import type { Answer } from "../../enterprise/entities/answer.ts";

export interface IAnswerRepository {
  create(answer: Answer): Promise<void>;
}
