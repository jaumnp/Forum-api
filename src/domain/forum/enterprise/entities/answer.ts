import type { Slug } from "./value-objects/slug.js";
import { Entity } from "../../../../core/entities/entity.js";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.js";
import type { Optional } from "../../../../core/types/options.js";
import dayjs from "dayjs";

interface IAnswareProps {
  authorId: UniqueEntityId;
  questionId: UniqueEntityId;
  content: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
}

export class Answer extends Entity<IAnswareProps> {
  static create(
    props: Optional<IAnswareProps, "createdAt" | "updatedAt">,
    id?: UniqueEntityId,
  ) {
    const answer = new Answer(
      {
        ...props,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      id,
    );

    return answer;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  get authorId() {
    return this.props.authorId;
  }

  get questionId() {
    return this.props.questionId;
  }

  set content(text: string) {
    if (text.length > 2400) throw new Error("Invalid content lenght!");

    this.props.content;
    this.touch();
  }

  get content() {
    return this.props.content;
  }

  get excerpt() {
    return this.props.content.substring(0, 120).trimEnd().concat("...");
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, "days") <= 3;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get slug() {
    return this.props.slug;
  }
}
