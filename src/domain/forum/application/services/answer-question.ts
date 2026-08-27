import { Answer } from "../entities/answer.js";
import { Slug } from "../entities/value-objects/slug.js";
import type { IAnswareRepository } from "../repository/answer-respository.js";

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
    const answer = new Answer({
      authorId: instructorId,
      questionId,
      content,
      slug,
    });

    if (!answer) throw new Error("Pergunta incorreta!");

    await this.repository.create(answer);

    return answer;
  }
}
