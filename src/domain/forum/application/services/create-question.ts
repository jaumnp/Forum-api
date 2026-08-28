import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";
import { Question } from "../../enterprise/entities/question.ts";
import type { IQuestionRepository } from "../repository/question-repository.ts";

interface ICreateQuestionRequest {
  authorId: string;
  title: string;
  content: string;
}

export class CreateQuestion {
  constructor(private repository: IQuestionRepository) {}

  async execute({ authorId, title, content }: ICreateQuestionRequest) {
    if (content.length > 2400)
      throw new Error("Maximun content length reached!");

    const question = Question.create({
      authorId: UniqueEntityId.create(authorId),
      title,
      content,
    });

    await this.repository.create(question);

    return { question };
  }
}
