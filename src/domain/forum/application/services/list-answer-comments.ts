import type { IAnswerCommentsRepository } from "../repository/answer-comment-repository.ts";

interface ListAnswerCommentsRequest {
  answerId: string;
  page: number;
}

export class ListAnswerComments {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

  async execute({ answerId, page }: ListAnswerCommentsRequest) {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      });

    return {
      answerComments,
    };
  }
}
