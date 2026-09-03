import { expect, describe, beforeEach, it } from "vitest";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";
import { makeQuestionComment } from "../../../../../test/factory/make-questio.comment.ts";
import { DeleteQuestionComment } from "./delete-question-comment.ts";
import { QuestionCommentsInMemoryRepository } from "../../../../../test/repository/InMemory/questionCommentInMemory.repository.ts";

let repository: QuestionCommentsInMemoryRepository;
let sut: DeleteQuestionComment;

describe("Delete Question Comment", () => {
  beforeEach(() => {
    repository = new QuestionCommentsInMemoryRepository();
    sut = new DeleteQuestionComment(repository);
  });

  it("should be able to delete a question comment", async () => {
    const questionComment = makeQuestionComment();

    await repository.create(questionComment);

    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    });

    expect(repository.items).toHaveLength(0);
  });

  it("should not be able to delete another user question comment", async () => {
    const questionComment = makeQuestionComment({
      authorId: UniqueEntityId.create("author-1"),
    });

    await repository.create(questionComment);

    expect(() => {
      return sut.execute({
        questionCommentId: questionComment.id.toString(),
        authorId: "author-2",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
