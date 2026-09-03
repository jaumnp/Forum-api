import { expect, beforeEach, describe, it } from "vitest";
import { AnswerCommentInMemoryRepository } from "../../../../../test/repository/InMemory/answerCommentInMemory.repository.ts";
import { makeAnswerComment } from "../../../../../test/factory/make-answer-comment.ts";
import { ListAnswerComments } from "./list-answer-comments.ts";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";

let repository: AnswerCommentInMemoryRepository;
let sut: ListAnswerComments;

describe("List Answer Comments", () => {
  beforeEach(() => {
    repository = new AnswerCommentInMemoryRepository();
    sut = new ListAnswerComments(repository);
  });

  it("should be able to fetch answer comments", async () => {
    await repository.create(
      makeAnswerComment({
        answerId: UniqueEntityId.create("answer-1"),
      }),
    );

    await repository.create(
      makeAnswerComment({
        answerId: UniqueEntityId.create("answer-1"),
      }),
    );

    await repository.create(
      makeAnswerComment({
        answerId: UniqueEntityId.create("answer-1"),
      }),
    );

    const { answerComments } = await sut.execute({
      answerId: "answer-1",
      page: 1,
    });

    expect(answerComments).toHaveLength(3);
  });

  it("should be able to fetch paginated answer comments", async () => {
    for (let i = 1; i <= 22; i++) {
      await repository.create(
        makeAnswerComment({
          answerId: UniqueEntityId.create("answer-1"),
        }),
      );
    }

    const { answerComments } = await sut.execute({
      answerId: "answer-1",
      page: 2,
    });

    expect(answerComments).toHaveLength(2);
  });
});
