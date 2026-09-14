import { expect } from "vitest";
import { QuestionsInMemoryRepository } from "../../../../../test/repository/InMemory/questiosInMemory.repository.ts";
import { beforeEach, describe, it } from "vitest";
import { makeQuestion } from "../../../../../test/factory/make-question.ts";
import { GetQuestionBySlug } from "./get-question-by-slug.ts";
import { Slug } from "../../enterprise/entities/value-objects/slug.ts";

let repository: QuestionsInMemoryRepository;
let sut: GetQuestionBySlug;

describe("Get question by slug", () => {
  beforeEach(() => {
    repository = new QuestionsInMemoryRepository();
    sut = new GetQuestionBySlug(repository);
  });

  it("should be able to get a question", async () => {
    const newQuestion = makeQuestion({ slug: Slug.create("test") });

    await repository.create(newQuestion);

    const result = await sut.execute({ slug: "test" });

    expect(result.isSuccess()).toBe(true);
    if (result.isFailure()) return;

    expect(result.value.question.slug.value).toBe("test");
  });

  it("should return an error trying to get a question", async () => {
    const newQuestion = makeQuestion();

    await repository.create(newQuestion);

    const result = await sut.execute({ slug: "jawida" });

    expect(result.isFailure()).toBe(true);
    if (result.isFailure()) {
      expect(result.value.message).toBe("Question not found!");
    }
  });
});
