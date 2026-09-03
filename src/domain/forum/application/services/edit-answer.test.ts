import { expect } from "vitest";
import { AnswerInMemoryRepository } from "../../../../../test/repository/InMemory/answersInMemory.repository.ts";
import { beforeEach, describe, it } from "vitest";
import { makeAnswer } from "../../../../../test/factory/make-answer.ts";
import { EditAnswer } from "./edit-answer.ts";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";

let repository: AnswerInMemoryRepository;
let sut: EditAnswer;

describe("Edit Answer", () => {
  beforeEach(() => {
    repository = new AnswerInMemoryRepository();
    sut = new EditAnswer(repository);
  });

  it("should be able to edit a answer", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: UniqueEntityId.create("author-1"),
      },
      UniqueEntityId.create("answer-1"),
    );

    await repository.create(newAnswer);

    await sut.execute({
      answerId: newAnswer.id.toValue(),
      authorId: "author-1",
      content: "Conteúdo teste",
    });

    expect(repository.items[0]).toMatchObject({
      content: "Conteúdo teste",
    });
  });

  it("should not be able to edit a answer from another user", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: UniqueEntityId.create("author-1"),
      },
      UniqueEntityId.create("answer-1"),
    );

    await repository.create(newAnswer);

    expect(() => {
      return sut.execute({
        answerId: newAnswer.id.toValue(),
        authorId: "author-2",
        content: "Conteúdo teste",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
