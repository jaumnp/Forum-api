import type { IAnswerRepository } from "../repository/answer-repository.ts";
import type { IQuestionRepository } from "../repository/question-repository.ts";

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

    if (!answer) throw new Error("Answer not found.");

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    );

    if (!question) throw new Error("Question not found.");

    if (authorId !== question.authorId.toString())
      throw new Error("Not allowed!");

    question.bestAnswerId = answer.id;

    await this.questionsRepository.save(question);

    return { message: "Best answer selected successfuly!" };
  }
}
