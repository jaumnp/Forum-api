import { failure, success } from "../../../../core/either.ts";
import type { IQuestionRepository } from "../repository/question-repository.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";

interface IDeleteQuestionRequest {
  id: string;
}

export class DeleteQuestion {
  constructor(private repository: IQuestionRepository) {}

  async execute({ id }: IDeleteQuestionRequest) {
    const question = await this.repository.findById(id);

    if (!question)
      return failure(new ResourceNotFoundError("Question not found!"));

    await this.repository.delete(question);

    return success({ message: "Question deleted successfully!" });
  }
}
