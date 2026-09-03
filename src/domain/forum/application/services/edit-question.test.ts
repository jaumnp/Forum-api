import { expect } from "vitest";
import { QuestionsInMemoryRepository } from "../../../../../test/repository/InMemory/questiosInMemory.repository.ts";
import { beforeEach, describe, it } from "vitest";
import { makeQuestion } from "../../../../../test/factory/make-question.ts";
import { EditQuestion } from "./edit-question.ts";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";

let repository: QuestionsInMemoryRepository;
let sut: EditQuestion;

describe("Edit Question", () => {
  beforeEach(() => {
    repository = new QuestionsInMemoryRepository();
    sut = new EditQuestion(repository);
  });

  it("should be able to edit a Question", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: UniqueEntityId.create("author-1"),
      },
      UniqueEntityId.create("Question-1"),
    );

    await repository.create(newQuestion);

    await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: "author-1",
      title: "Pergunta teste",
      content: "Conteúdo teste",
    });

    expect(repository.items[0]).toMatchObject({
      title: "Pergunta teste",
      content: "Conteúdo teste",
    });
  });

  it("should not be able to edit a Question from another user", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: UniqueEntityId.create("author-1"),
      },
      UniqueEntityId.create("Question-1"),
    );

    await repository.create(newQuestion);

    expect(() => {
      return sut.execute({
        questionId: newQuestion.id.toValue(),
        authorId: "author-2",
        title: "Pergunta teste",
        content: "Conteúdo teste",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
