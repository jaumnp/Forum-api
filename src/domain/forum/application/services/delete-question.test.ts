import { expect } from "vitest";
import { QuestionsInMemoryRepository } from "../../../../../test/repository/InMemory/questiosInMemory.repository.ts";
import { beforeEach, describe, it } from "vitest";
import { DeleteQuestion } from "./delete-question.ts";
import { makeQuestion } from "../../../../../test/factory/make-question.ts";

let repository: QuestionsInMemoryRepository;
let sut: DeleteQuestion;

describe("delete a question", () => {
  beforeEach(() => {
    repository = new QuestionsInMemoryRepository();
    sut = new DeleteQuestion(repository);
  });

  it("should be able to delete a question", async () => {
    const newQuestio = makeQuestion();
    await repository.create(newQuestio);

    const questions = await repository.findAll();

    const { message } = await sut.execute({
      id: questions[0]?.id.toString() as string,
    });

    expect(message).toBe("Question deleted successfully!");
  });

  it("should throw an error trying to delete a question with incorrect id", async () => {
    await expect(sut.execute({ id: "ajwdjiawd" })).rejects.toThrow(
      "Question not found!",
    );
  });
});
