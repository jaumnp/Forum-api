import type { Answer } from "../../../src/domain/forum/enterprise/entities/answer.ts";
import type { IAnswerRepository } from "../../../src/domain/forum/application/repository/answer-repository.ts";

export class AnswerInMemoryRepository implements IAnswerRepository {
  public items: Answer[] = [];

  async create(answer: Answer) {
    this.items.push(answer);
  }
}
