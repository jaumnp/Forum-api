import { expect, describe, beforeEach, it } from "vitest";
import { AnswerInMemoryRepository } from "../../../../../test/repository/InMemory/answersInMemory.repository.ts";
import { makeAnswer } from "../../../../../test/factory/make-answer.ts";
import { AnswerCommentInMemoryRepository } from "../../../../../test/repository/InMemory/answerCommentInMemory.repository.ts";
import { CommentOnAnswer } from "./comment-on-answer.ts";

let answersRepository: AnswerInMemoryRepository;
let answerCommentsInMemoryRepository: AnswerCommentInMemoryRepository;
let sut: CommentOnAnswer;

describe("Comment on Answer", () => {
  beforeEach(() => {
    answersRepository = new AnswerInMemoryRepository();
    answerCommentsInMemoryRepository = new AnswerCommentInMemoryRepository();

    sut = new CommentOnAnswer(
      answersRepository,
      answerCommentsInMemoryRepository,
    );
  });

  it("should be able to comment on answer", async () => {
    const answer = makeAnswer();

    await answersRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: "Comentário teste",
    });

    expect(answerCommentsInMemoryRepository.items[0]!.content).toEqual(
      "Comentário teste",
    );
  });
});
