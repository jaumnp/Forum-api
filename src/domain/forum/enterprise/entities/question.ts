import { Slug } from "./value-objects/slug.js";
import type { UniqueEntityId } from "../../../../core/entities/unique-entity-id.js";
import type { Optional } from "../../../../core/types/options.js";
import { AggregateRoot } from "../../../../core/entities/aggregate-root.ts";
import dayjs from "dayjs";
import type { QuestionAttachment } from "./question-attachment.ts";
import { QuestionAttachmentList } from "./queation-attachment-list.ts";

export interface IQuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId;
  title: string;
  content: string;
  attachments: QuestionAttachmentList;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends AggregateRoot<IQuestionProps> {
  static create(
    props: Optional<
      IQuestionProps,
      "createdAt" | "updatedAt" | "slug" | "attachments"
    >,
    id?: UniqueEntityId,
  ) {
    const date = props.createdAt ?? new Date();
    const question = new Question(
      {
        ...props,
        createdAt: date,
        updatedAt: date,
        attachments: props.attachments ?? new QuestionAttachmentList(),
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

  get attachments() {
    return this.props.attachments;
  }

  set attachments(attachments: QuestionAttachmentList) {
    this.props.attachments = attachments;
  }

  set content(text: string) {
    if (text.length > 2400) throw new Error("Invalid content lenght!");

    this.props.content = text;
    this.touch();
  }

  set title(text: string) {
    if (text.length > 120) throw new Error("Invalid content lenght!");

    this.props.title = text;
    this.props.slug = Slug.createFromText(text);
    this.touch();
  }

  get title() {
    return this.props.title;
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
