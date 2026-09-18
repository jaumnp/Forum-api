import { failure, success } from "../../../../core/either.ts";
import type { IAnswerRepository } from "../repository/answer-repository.ts";
import type { IQuestionRepository } from "../repository/question-repository.ts";
import { NotAllowed } from "../../../../core/errors/errors/not-allowed-error.ts";
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found-error.ts";

interface IChooseBestAnswerRequest {
  answerId: string;
  authorId: string;
}

export class EditAnswer {
  constructor(
    private questionsRepository: IQuestionRepository,
    private answersRepository: IAnswerRepository,
  ) {}

  async execute({ answerId, authorId }: IChooseBestAnswerRequest) {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) return failure(new ResourceNotFoundError("Answer not found."));

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    );

    if (!question)
      return failure(new ResourceNotFoundError("Question not found."));

    if (authorId !== question.authorId.toString())
      return failure(new NotAllowed("Not allowed!"));

    question.bestAnswerId = answer.id;

    await this.questionsRepository.save(question);

    return success({ message: "Best answer selected successfuly!" });
  }
}
