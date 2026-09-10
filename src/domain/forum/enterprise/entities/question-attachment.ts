import { Entity } from "../../../../core/entities/entity.ts";
import type { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";

interface IQuestionAttachment {
  questionId: UniqueEntityId;
  attachmentId: UniqueEntityId;
}

export class QuestionAttachment extends Entity<IQuestionAttachment> {
  get questionId() {
    return this.props.questionId;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }

  static create(props: IQuestionAttachment, id?: UniqueEntityId) {
    return new QuestionAttachment(props, id);
  }
}
