import { expect, describe, beforeEach, it } from "vitest";
import { QuestionCommentsInMemoryRepository } from "../../../../../test/repository/InMemory/questionCommentInMemory.repository.ts";
import { QuestionsInMemoryRepository } from "../../../../../test/repository/InMemory/questiosInMemory.repository.ts";
import { makeQuestion } from "../../../../../test/factory/make-question.ts";
import { CommentOnQuestion } from "./comment-on-questio.ts";

let questionRepository: QuestionsInMemoryRepository;
let questionCommentsRepository: QuestionCommentsInMemoryRepository;
let sut: CommentOnQuestion;

describe("Comment on Question", () => {
  beforeEach(() => {
    questionRepository = new QuestionsInMemoryRepository();
    questionCommentsRepository = new QuestionCommentsInMemoryRepository();

    sut = new CommentOnQuestion(questionRepository, questionCommentsRepository);
  });

  it("should be able to comment on question", async () => {
    const question = makeQuestion();

    await questionRepository.create(question);

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: "Comentário teste",
    });

    expect(questionCommentsRepository.items[0]!.content).toEqual(
      "Comentário teste",
    );
  });
});
