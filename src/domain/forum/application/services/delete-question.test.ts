import { expect } from "vitest";
import { QuestionsInMemoryRepository } from "../../../../../test/repository/InMemory/questiosInMemory.repository.ts";
import { beforeEach, describe, it } from "vitest";
import { DeleteQuestion } from "./delete-question.ts";
import { makeQuestion } from "../../../../../test/factory/make-question.ts";
import { QuestionAttachmentInMemoryRepository } from "../../../../../test/repository/InMemory/questioAttachmentInMemoryRepository.ts";

let repository: QuestionsInMemoryRepository;
let attachmentRepository: QuestionAttachmentInMemoryRepository;
let sut: DeleteQuestion;

describe("delete a question", () => {
  beforeEach(() => {
    attachmentRepository = new QuestionAttachmentInMemoryRepository();
    repository = new QuestionsInMemoryRepository(attachmentRepository);
    sut = new DeleteQuestion(repository);
  });

  it("should be able to delete a question", async () => {
    const newQuestio = makeQuestion();
    await repository.create(newQuestio);

    const questions = await repository.findAll();

    const result = await sut.execute({
      id: questions[0]?.id.toString() as string,
    });

    expect(result.isSuccess()).toBe(true);
    if (result.isSuccess()) {
      expect(result.value.message).toBe("Question deleted successfully!");
    }
  });

  it("should return an error trying to delete a question with incorrect id", async () => {
    const result = await sut.execute({ id: "ajwdjiawd" });

    expect(result.isFailure()).toBe(true);
    if (result.isFailure()) {
      expect(result.value.message).toBe("Question not found!");
    }
  });
});
