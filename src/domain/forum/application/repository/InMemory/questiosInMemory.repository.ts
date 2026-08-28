import type { Question } from "../../../enterprise/entities/question.ts";
import type { IQuestion } from "../create-repository.ts";

export class QuestionsInMemoryRepository implements IQuestion {
  public items: Question[] = [];

  async create(question: Question) {
    this.items.push(question);
  }
}
