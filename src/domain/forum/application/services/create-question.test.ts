import { expect } from "vitest";
import { CreateQuestion } from "./create-question.ts";
import { QuestionsInMemoryRepository } from "../../../../../test/repository/InMemory/questiosInMemory.repository.ts";
import { beforeEach, describe, it } from "vitest";

let repository: QuestionsInMemoryRepository;
let sut: CreateQuestion;

describe("create a question", () => {
  beforeEach(() => {
    repository = new QuestionsInMemoryRepository();
    sut = new CreateQuestion(repository);
  });

  it("should be able to create a question", async () => {
    const { question } = await sut.execute({
      authorId: "1",
      title: "Nova pergunta",
      content: "Conteúdo da pergunta",
    });

    expect(question.id).toBeTruthy();
    expect(repository.items[0]?.id).toEqual(question.id);
  });

  it("should throw an error creating a question", async () => {
    await expect(
      sut.execute({
        authorId: "1",
        title: "Teste Pergunta",
        content:
          "<p>Lorem ipsum dolor sit amet. Ea facilis perferendis sit voluptatibus asperiores est veniam rerum eos odio cumque qui omnis provident ab officia facere. Et ipsum deleniti sit voluptatem minima a autem animi sed molestiae repellat id repellat nemo. </p><p>At molestiae voluptatem ut veritatis commodi est error incidunt sed consequatur iusto et perferendis quod. Quo culpa dicta et nostrum incidunt ut dicta recusandae eum iste similique aut incidunt autem ut delectus expedita. Eum labore accusantium est voluptatibus ipsa ex veritatis tempore id odio sequi. </p><p>Eos aliquid natus et ipsam galisum et facere praesentium vel praesentium reprehenderit aut nihil sunt. Non adipisci nostrum vel voluptatem omnis qui voluptas cumque et totam omnis non nihil Quis ut natus commodi. Id rerum dicta et adipisci quae non dolorem eligendi est tenetur placeat qui exercitationem nulla. Vel temporibus laboriosam eum dolorem totam in autem dolore vel nulla modi sit quibusdam sapiente sit voluptas voluptatem est cumque excepturi. </p><p>Non atque quisquam vel ipsum neque aut quibusdam asperiores. Id iure molestiae et reiciendis facilis cum modi nesciunt a dolore Quis est corporis nihil At maiores esse 33 velit necessitatibus. At cumque nobis ut quia architecto sit itaque voluptate aut voluptatem inventore id alias magnam. </p><p>Et nobis recusandae qui alias dolores sed facere odit est quasi deserunt. Qui voluptas eveniet ut vero sequi aut commodi eveniet est blanditiis consequatur et similique totam et error enim? Aut quia omnis qui voluptatem neque vel rerum asperiores et ullam quia et possimus necessitatibus At quisquam distinctio et aliquid quas. </p><p>Est dolor magni sed facere iusto eum quam quam vel repudiandae illo et omnis similique eos voluptatem asperiores et alias consequatur. Aut veniam quisquam qui fugit accusantium ut voluptatum quidem id dicta illum nam explicabo ipsam non veritatis magni ea sunt sunt. Ex velit nostrum ut nobis doloribus hic dolor error id similique obcaecati nam facilis dolores et quisquam quia. </p><p>Aut voluptas dolores 33 molestiae voluptatem ut dolor omnis aut illum enim eos illum magnam quo quibusdam doloribus sit quas distinctio. Ab aspernatur Quis vel minima eligendi non quia quia. Ea dolores fuga sit repellat magni ut exercitationem mollitia ex debitis ipsam? Aut optio nihil ut nisi porro rem illum totam sit voluptas sint sed labore aspernatur. </p><p>Qui inventore saepe ad cupiditate rerum ut placeat laborum. Et ducimus quidem ut provident facilis qui unde rerum qui inventore modi non impedit modi. </p><p>Et voluptatum sint ut reprehenderit repellendus non sequi totam. At consequatur unde et maxime incidunt qui sequi repellendus. A aspernatur incidunt eum nobis cumque sed dolores dolor in deleniti autem et sint nostrum quo architecto inventore. </p><p>Sit molestias incidunt aut fuga molestiae ex quibusdam quia et fuga mollitia et consequatur suscipit nam ullam dolor sed asperiores voluptas. Quo atque architecto ut dolorem neque et enim internos eum modi illum sed blanditiis magni aut dolor voluptatem! Eum facilis rerum non odit autem sed numquam quisquam. </p>",
      }),
    ).rejects.toThrow("Maximun content length reached!");
  });
});
