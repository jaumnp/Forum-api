import type { IQuestionRepository } from "../repository/question-repository.ts";

interface IDeleteQuestionRequest {
  id: string;
}

export class DeleteQuestion {
  constructor(private repository: IQuestionRepository) {}

  async execute({ id }: IDeleteQuestionRequest) {
    const question = await this.repository.findById(id);

    if (!question) throw new Error("Question not found!");

    await this.repository.delete(question);

    return { message: "Question deleted successfully!" };
  }
}
