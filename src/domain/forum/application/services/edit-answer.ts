import { failure, success } from "../../../../core/either.ts";
import type { IAnswerRepository } from "../repository/answer-repository.ts";
import { NotAllowed } from "../../../../core/errors/errors/not-allowed-error.ts";
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found-error.ts";

interface IEditAnswerRequest {
  answerId: string;
  authorId: string;
  content: string;
}

export class EditAnswer {
  constructor(private repository: IAnswerRepository) {}

  async execute({ answerId, authorId, content }: IEditAnswerRequest) {
    const answer = await this.repository.findById(answerId);

    if (!answer) return failure(new ResourceNotFoundError("Answer not found!"));

    if (authorId !== answer.authorId.toString())
      return failure(new NotAllowed("Author incorrect!"));

    answer.content = content;

    await this.repository.save(answer);

    return success({ message: "Answer edited successfully!" });
  }
}
