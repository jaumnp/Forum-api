import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";
import { Answer } from "../../enterprise/entities/answer.ts";
import { Slug } from "../../enterprise/entities/value-objects/slug.ts";
import type { IAnswareRepository } from "../repository/answer-respository.ts";

interface IAnswerQuestionRequest {
  instructorId: string;
  questionId: string;
  content: string;
  slug: Slug;
}

export class AnswerQuestion {
  constructor(private repository: IAnswareRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
    slug,
  }: IAnswerQuestionRequest) {
    const answer = Answer.create({
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
      content,
      slug,
    });

    if (!answer) throw new Error("Pergunta incorreta!");

    await this.repository.create(answer);

    return answer;
  }
}
