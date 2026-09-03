import { expect } from "vitest";
import { QuestionsInMemoryRepository } from "../../../../../test/repository/InMemory/questiosInMemory.repository.ts";
import { beforeEach, describe, it } from "vitest";
import { makeQuestion } from "../../../../../test/factory/make-question.ts";
import { ListRecentQuestions } from "./list-recent-questions.ts";

let repository: QuestionsInMemoryRepository;
let sut: ListRecentQuestions;

describe("Fetch Recent Questions", () => {
  beforeEach(() => {
    repository = new QuestionsInMemoryRepository();
    sut = new ListRecentQuestions(repository);
  });

  it("should be able to list recent questions", async () => {
    await repository.create(makeQuestion({ createdAt: new Date(2022, 0, 20) }));
    await repository.create(makeQuestion({ createdAt: new Date(2022, 0, 18) }));
    await repository.create(makeQuestion({ createdAt: new Date(2022, 0, 23) }));

    const { questions } = await sut.execute({
      page: 1,
    });

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ]);
  });

  it("should be able to repository paginated recent questions", async () => {
    for (let i = 1; i <= 22; i++) {
      await repository.create(makeQuestion());
    }

    const { questions } = await sut.execute({
      page: 2,
    });

    expect(questions).toHaveLength(2);
  });
});
