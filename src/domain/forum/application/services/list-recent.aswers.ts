import type { IAnswerRepository } from "../repository/answer-repository.ts";

interface IListRecentAnswersRequest {
  questionId: string;
  page: number;
}

export class ListRecentAnswers {
  constructor(private repository: IAnswerRepository) {}

  async execute({ questionId, page }: IListRecentAnswersRequest) {
    const answers = await this.repository.findManyByQuestionId(questionId, {
      page,
    });

    return {
      answers,
    };
  }
}
