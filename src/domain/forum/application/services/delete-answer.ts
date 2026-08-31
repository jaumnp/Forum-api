import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";
import type { IAnswerRepository } from "../repository/answer-repository.ts";

interface IDeleteAnswerRequest {
  id: string;
}

export class DeleteAnswer {
  constructor(private repository: IAnswerRepository) {}

  async execute({ id }: IDeleteAnswerRequest) {
    const answer = await this.repository.findById(id);

    if (!answer) throw new Error("Answer not found!");

    await this.repository.delete(answer);

    return { message: "Answer deleted successfully!" };
  }
}
