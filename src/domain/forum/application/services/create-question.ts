import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";
import { Question } from "../../enterprise/entities/question.ts";
import type { IQuestion } from "../repository/create-repository.ts";

interface ICreateQuestionRequest {
  authorId: string;
  title: string;
  content: string;
}

export class CreateQuestion {
  constructor(private repository: IQuestion) {}

  async execute({ authorId, title, content }: ICreateQuestionRequest) {
    if (content.length > 2400)
      throw new Error("Maximun content length reached!");

    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    });

    await this.repository.create(question);

    return { question };
  }
}
