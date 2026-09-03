import type { IQuestionRepository } from "../repository/question-repository.ts";

interface IListRecentQuestionRequest {
  page: number;
}

export class ListRecentQuestions {
  constructor(private repository: IQuestionRepository) {}

  async execute({ page }: IListRecentQuestionRequest) {
    const questions = await this.repository.findManyRecent({ page });

    return {
      questions,
    };
  }
}
