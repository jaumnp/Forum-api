import type { Answer } from "../../../src/domain/forum/enterprise/entities/answer.ts";
import type { IAnswerRepository } from "../../../src/domain/forum/application/repository/answer-repository.ts";

export class AnswerInMemoryRepository implements IAnswerRepository {
  public items: Answer[] = [];

  async findAll() {
    return this.items;
  }

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() == id);

    if (!answer) return null;

    return answer;
  }

  async findBySlug(slug: string) {
    const answer = this.items.find((item) => item.slug.value == slug);

    if (!answer) return null;

    return answer;
  }

  async create(answer: Answer) {
    this.items.push(answer);
  }

  async delete(answer: Answer) {
    const index = this.items.findIndex(
      (item) => item.id.toString() === answer.id.toString(),
    );

    this.items.splice(index, 1);
  }
}
