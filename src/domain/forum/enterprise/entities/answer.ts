import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.js";
import type { Optional } from "../../../../core/types/options.js";
import dayjs from "dayjs";
import { AnswerAttachmentList } from "./answer-attachment-list.ts";
import { AnswerCreatedEvent } from "../events/answer-created-event.ts";
import { AggregateRoot } from "../../../../core/entities/aggregate-root.ts";

export interface IAnswerProps {
  authorId: UniqueEntityId;
  questionId: UniqueEntityId;
  content: string;
  attachments: AnswerAttachmentList;
  createdAt: Date;
  updatedAt?: Date;
}

export class Answer extends AggregateRoot<IAnswerProps> {
  static create(
    props: Optional<IAnswerProps, "createdAt" | "updatedAt" | "attachments">,
    id?: UniqueEntityId,
  ) {
    const date = props.createdAt ?? new Date();
    const answer = new Answer(
      {
        ...props,
        createdAt: date,
        updatedAt: date,
        attachments: props.attachments ?? new AnswerAttachmentList(),
      },
      id,
    );

    const isNewAnswer = !id;

    if (isNewAnswer) {
      answer.addDomainEvent(new AnswerCreatedEvent(answer));
    }

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

    this.props.content = text;
    this.touch();
  }

  get attachments() {
    return this.props.attachments;
  }

  set attachments(attachments: AnswerAttachmentList) {
    this.props.attachments = attachments;
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
}
