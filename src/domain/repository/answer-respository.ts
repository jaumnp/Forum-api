import type { Answer } from "../entities/answer.js";

export interface IAnswareRepository {
  create(answer: Answer): Promise<void>;
}
