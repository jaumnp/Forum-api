import { failure, success } from "../../../../core/either.ts";
import { Slug } from "../../enterprise/entities/value-objects/slug.ts";
import type { IQuestionRepository } from "../repository/question-repository.ts";
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found-error.ts";

interface IGetQuestionBySlugRequest {
  slug: string;
}

export class GetQuestionBySlug {
  constructor(private repository: IQuestionRepository) {}

  async execute({ slug }: IGetQuestionBySlugRequest) {
    const question = await this.repository.findBySlug(slug);

    if (!question)
      return failure(new ResourceNotFoundError("Question not found!"));

    return success({ question });
  }
}
