import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";
import { Question } from "../../enterprise/entities/question.ts";
import type { IQuestionRepository } from "../repository/question-repository.ts";

interface IEditQuestionRequest {
  questionId: string;
  authorId: string;
  title: string;
  content: string;
}

export class EditQuestion {
  constructor(private repository: IQuestionRepository) {}

  async execute({
    questionId,
    authorId,
    title,
    content,
  }: IEditQuestionRequest) {
    const question = await this.repository.findById(questionId);

    if (!question) throw new Error("Question not found!");

    if (authorId !== question.authorId.toString())
      throw new Error("Author incorrect!");

    question.title = title;
    question.content = content;

    await this.repository.save(question);

    return { message: "Question edited successfully!" };
  }
}
