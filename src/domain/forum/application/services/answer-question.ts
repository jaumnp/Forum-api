import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";
import { Answer } from "../../enterprise/entities/answer.js";
import { Slug } from "../../enterprise/entities/value-objects/slug.js";
import type { IAnswerRepository } from "../repository/answer-repository.ts";

interface IAnswerQuestionRequest {
  instructorId: string;
  questionId: string;
  content: string;
  slug: Slug;
}

export class CreateAnswerQuestion {
  constructor(private repository: IAnswerRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
    slug,
  }: IAnswerQuestionRequest) {
    const answer = Answer.create({
      authorId: UniqueEntityId.create(instructorId),
      questionId: UniqueEntityId.create(questionId),
      content,
      slug,
    });

    if (!answer) throw new Error("Pergunta incorreta!");

    await this.repository.create(answer);

    return {
      answer,
    };
  }
}
