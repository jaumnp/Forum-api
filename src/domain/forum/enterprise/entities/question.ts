import { Slug } from "./value-objects/slug.js";
import { Entity } from "../../../../core/entities/entity.js";
import type { UniqueEntityId } from "../../../../core/entities/unique-entity-id.js";
import type { Optional } from "../../../../core/types/options.js";
import dayjs from "dayjs";

interface IQuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId;
  title: string;
  content: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<IQuestionProps> {
  static create(
    props: Optional<IQuestionProps, "createdAt" | "updatedAt" | "slug">,
    id?: UniqueEntityId,
  ) {
    const question = new Question(
      {
        ...props,
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: props.slug ?? Slug.createFromText(props.title),
      },
      id,
    );

    return question;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  get authorId() {
    return this.props.authorId;
  }

  set bestAnswerId(bestAnswerId: UniqueEntityId) {
    this.props.bestAnswerId = bestAnswerId;
    this.touch();
  }

  get bestAnswerId() {
    return this.props.bestAnswerId as UniqueEntityId;
  }

  set content(text: string) {
    if (text.length > 2400) throw new Error("Invalid content lenght!");

    this.props.content = text;
    this.touch();
  }

  set title(text: string) {
    if (text.length > 120) throw new Error("Invalid content lenght!");

    this.props.content;
    this.props.slug = Slug.createFromText(text);
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

console.log(Question);
