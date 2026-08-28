import type { Question } from "../../../src/domain/forum/enterprise/entities/question.ts";
import type { IQuestionRepository } from "../../../src/domain/forum/application/repository/question-repository.ts";

export class QuestionsInMemoryRepository implements IQuestionRepository {
  public items: Question[] = [];

  async findAll() {
    return this.items;
  }

  async findById(id: string) {
    const question = this.items.find((item) => item.id.toString() == id);

    if (!question) return null;

    return question;
  }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value == slug);

    if (!question) return null;

    return question;
  }

  async create(question: Question) {
    this.items.push(question);
  }

  async delete(question: Question) {
    const index = this.items.findIndex(
      (item) => item.id.toString() === question.id.toString(),
    );

    this.items.splice(index, 1);
  }
}
