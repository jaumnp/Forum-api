import { test, expect } from "vitest";
import { AnswerQuestion } from "./answer-question.js";
import type { IAnswareRepository } from "../repository/answer-respository.js";
import type { Answer } from "../../enterprise/entities/answer.js";
import { Slug } from "../../enterprise/entities/value-objects/slug.js";

const rep: IAnswareRepository = {
  create: async (answer: Answer) => {
    return;
  },
};

test("Test answer response", async () => {
  const answerQuestion = new AnswerQuestion(rep);

  const answer = await answerQuestion.execute({
    instructorId: "1",
    questionId: "1",
    content: "Teste resposta",
    slug: Slug.createFromText("TesteJB__ "),
  });

  expect(answer.content).toEqual("Teste resposta");
  expect(answer.slug.value).toBe("testejb");
});
