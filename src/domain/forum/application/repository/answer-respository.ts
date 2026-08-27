import type { Answer } from "../../enterprise/entities/answer.ts";

export interface IAnswareRepository {
  create(answer: Answer): Promise<void>;
}
