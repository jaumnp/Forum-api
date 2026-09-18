import { failure, success } from "../../../../core/either.ts";
import type { IAnswerRepository } from "../repository/answer-repository.ts";
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found-error.ts";

interface IDeleteAnswerRequest {
  id: string;
}

export class DeleteAnswer {
  constructor(private repository: IAnswerRepository) {}

  async execute({ id }: IDeleteAnswerRequest) {
    const answer = await this.repository.findById(id);

    if (!answer) return failure(new ResourceNotFoundError("Answer not found!"));

    await this.repository.delete(answer);

    return success({ message: "Answer deleted successfully!" });
  }
}
