import { expect } from "vitest";
import { QuestionsInMemoryRepository } from "../../../../../test/repository/InMemory/questiosInMemory.repository.ts";
import { beforeEach, describe, it } from "vitest";
import { makeQuestion } from "../../../../../test/factory/make-question.ts";
import { EditQuestion } from "./edit-question.ts";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";
import { QuestionAttachmentInMemoryRepository } from "../../../../../test/repository/InMemory/questioAttachmentInMemoryRepository.ts";
import { makeQuestionAttachment } from "../../../../../test/factory/make-question-attachment.ts";

let repository: QuestionsInMemoryRepository;
let questionAttachmentInMemoryRepository: QuestionAttachmentInMemoryRepository;
let sut: EditQuestion;

describe("Edit Question", () => {
  beforeEach(() => {
    repository = new QuestionsInMemoryRepository(
      questionAttachmentInMemoryRepository,
    );
    questionAttachmentInMemoryRepository =
      new QuestionAttachmentInMemoryRepository();
    sut = new EditQuestion(repository, questionAttachmentInMemoryRepository);
  });

  it("should be able to edit a Question", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: UniqueEntityId.create("author-1"),
      },
      UniqueEntityId.create("Question-1"),
    );

    await repository.create(newQuestion);

    questionAttachmentInMemoryRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: UniqueEntityId.create("1"),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: UniqueEntityId.create("2"),
      }),
    );

    await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: "author-1",
      title: "Pergunta teste",
      content: "Conteúdo teste",
      attachmentsId: ["1", "3"],
    });

    expect(repository.items[0]).toMatchObject({
      title: "Pergunta teste",
      content: "Conteúdo teste",
    });

    expect(repository.items[0]?.attachments.currentItems).toHaveLength(2);
    expect(repository.items[0]?.attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: UniqueEntityId.create("1") }),
      expect.objectContaining({ attachmentId: UniqueEntityId.create("3") }),
    ]);
  });

  it("should not be able to edit a Question from another user", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: UniqueEntityId.create("author-1"),
      },
      UniqueEntityId.create("Question-1"),
    );

    await repository.create(newQuestion);

    const result = await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: "author-2",
      title: "Pergunta teste",
      content: "Conteúdo teste",
      attachmentsId: [],
    });

    expect(result.isFailure()).toBe(true);
  });
});
