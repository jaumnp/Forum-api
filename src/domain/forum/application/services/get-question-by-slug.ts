import { Slug } from "../../enterprise/entities/value-objects/slug.ts";
import type { IQuestionRepository } from "../repository/question-repository.ts";

interface IGetQuestionBySlugRequest {
  slug: string;
}

export class GetQuestionBySlug {
  constructor(private repository: IQuestionRepository) {}

  async execute({ slug }: IGetQuestionBySlugRequest) {
    const question = await this.repository.findBySlug(slug);

    if (!question) throw new Error("Question not found!");

    return { question };
  }
}
