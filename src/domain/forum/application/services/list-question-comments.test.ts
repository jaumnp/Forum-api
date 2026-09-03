import { expect, beforeEach, describe, it } from "vitest";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";
import { ListQuestionComments } from "./list-question-comments.ts";
import { QuestionCommentsInMemoryRepository } from "../../../../../test/repository/InMemory/questionCommentInMemory.repository.ts";
import { makeQuestionComment } from "../../../../../test/factory/make-questio.comment.ts";

let repository: QuestionCommentsInMemoryRepository;
let sut: ListQuestionComments;

describe("List Question Comments", () => {
  beforeEach(() => {
    repository = new QuestionCommentsInMemoryRepository();
    sut = new ListQuestionComments(repository);
  });

  it("should be able to fetch question comments", async () => {
    await repository.create(
      makeQuestionComment({
        questionId: UniqueEntityId.create("question-1"),
      }),
    );

    await repository.create(
      makeQuestionComment({
        questionId: UniqueEntityId.create("question-1"),
      }),
    );

    await repository.create(
      makeQuestionComment({
        questionId: UniqueEntityId.create("question-1"),
      }),
    );

    const { questionComments } = await sut.execute({
      questionId: "question-1",
      page: 1,
    });

    expect(questionComments).toHaveLength(3);
  });

  it("should be able to fetch paginated question comments", async () => {
    for (let i = 1; i <= 22; i++) {
      await repository.create(
        makeQuestionComment({
          questionId: UniqueEntityId.create("question-1"),
        }),
      );
    }

    const { questionComments } = await sut.execute({
      questionId: "question-1",
      page: 2,
    });

    expect(questionComments).toHaveLength(2);
  });
});
