import type { Question } from "../../../src/domain/forum/enterprise/entities/question.ts";
import type { IQuestionRepository } from "../../../src/domain/forum/application/repository/question-repository.ts";

export class QuestionsInMemoryRepository implements IQuestionRepository {
  public items: Question[] = [];

  async create(question: Question) {
    this.items.push(question);
  }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value == slug);

    console.log();

    if (!question) return null;

    return question;
  }
}
