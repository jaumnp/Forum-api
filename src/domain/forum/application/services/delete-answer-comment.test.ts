import { expect, describe, beforeEach, it } from "vitest";
import { AnswerCommentInMemoryRepository } from "../../../../../test/repository/InMemory/answerCommentInMemory.repository.ts";
import { DeleteAnswerComment } from "./delete-answer-comment.ts";
import { makeAnswerComment } from "../../../../../test/factory/make-answer-comment.ts";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";

let repository: AnswerCommentInMemoryRepository;
let sut: DeleteAnswerComment;

describe("Delete Answer Comment", () => {
  beforeEach(() => {
    repository = new AnswerCommentInMemoryRepository();

    sut = new DeleteAnswerComment(repository);
  });

  it("should be able to delete a answer comment", async () => {
    const answerComment = makeAnswerComment();

    await repository.create(answerComment);

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    });

    expect(repository.items).toHaveLength(0);
  });

  it("should not be able to delete another user answer comment", async () => {
    const answerComment = makeAnswerComment({
      authorId: UniqueEntityId.create("author-1"),
    });

    await repository.create(answerComment);

    expect(() => {
      return sut.execute({
        answerCommentId: answerComment.id.toString(),
        authorId: "author-2",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
