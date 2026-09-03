import type { IQuestionCommentsRepository } from "../repository/questio-comment-repository.ts";

interface ListQuestionCommentsRequest {
  questionId: string;
  page: number;
}

export class ListQuestionComments {
  constructor(
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async execute({ questionId, page }: ListQuestionCommentsRequest) {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      });

    return {
      questionComments,
    };
  }
}
