import { it, expect } from "vitest";
import { CreateAnswerQuestion } from "./answer-question.ts";
import { Slug } from "../../enterprise/entities/value-objects/slug.ts";
import { AnswerInMemoryRepository } from "../repository/InMemory/answersInMemory.repository.ts";
import { beforeEach, describe } from "vitest";

let repository: AnswerInMemoryRepository;
let sut: CreateAnswerQuestion;

describe("create an answer", () => {
  beforeEach(() => {
    repository = new AnswerInMemoryRepository();
    sut = new CreateAnswerQuestion(repository);
  });

  it("should create an answer", async () => {
    const { answer } = await sut.execute({
      instructorId: "1",
      questionId: "1",
      content: "Teste resposta",
      slug: Slug.createFromText("TesteJB__ "),
    });

    expect(answer.content).toEqual("Teste resposta");
    expect(answer.slug.value).toBe("testejb");
  });
});
