import type { Answer } from "../../../enterprise/entities/answer.ts";
import type { IAnswerRepository } from "../answer-repository.ts";

export class AnswerInMemoryRepository implements IAnswerRepository {
  public items: Answer[] = [];

  async create(answer: Answer) {
    this.items.push(answer);
  }
}
