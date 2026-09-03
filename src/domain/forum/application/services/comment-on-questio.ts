import type { IQuestionRepository } from "../repository/question-repository.ts";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";
import { QuestionComment } from "../../enterprise/entities/question-comment.ts";
import type { IQuestionCommentsRepository } from "../repository/questio-comment-repository.ts";

interface CommentOnQuestionRequest {
  authorId: string;
  questionId: string;
  content: string;
}

export class CommentOnQuestion {
  constructor(
    private questionsRepository: IQuestionRepository,
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async execute({ authorId, questionId, content }: CommentOnQuestionRequest) {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found.");
    }

    const questionComment = QuestionComment.create({
      authorId: UniqueEntityId.create(authorId),
      questionId: UniqueEntityId.create(questionId),
      content,
    });

    await this.questionCommentsRepository.create(questionComment);

    return {
      questionComment,
    };
  }
}
