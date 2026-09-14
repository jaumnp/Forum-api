import { failure, success } from "../../../../core/either.ts";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";
import { Answer } from "../../enterprise/entities/answer.js";
import { Slug } from "../../enterprise/entities/value-objects/slug.js";
import type { IAnswerRepository } from "../repository/answer-repository.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";

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

    if (!answer)
      return failure(new ResourceNotFoundError("Pergunta incorreta!"));

    await this.repository.create(answer);

    return success({
      answer,
    });
  }
}
