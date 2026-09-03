import type { IAnswerRepository } from "../repository/answer-repository.ts";

interface IEditAnswerRequest {
  answerId: string;
  authorId: string;
  content: string;
}

export class EditAnswer {
  constructor(private repository: IAnswerRepository) {}

  async execute({ answerId, authorId, content }: IEditAnswerRequest) {
    const answer = await this.repository.findById(answerId);

    if (!answer) throw new Error("Answer not found!");

    if (authorId !== answer.authorId.toString())
      throw new Error("Author incorrect!");

    answer.content = content;

    await this.repository.save(answer);

    return { message: "Answer edited successfully!" };
  }
}
