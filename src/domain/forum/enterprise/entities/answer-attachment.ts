import { Entity } from "../../../../core/entities/entity.ts";
import type { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";

interface IAnswerAttachment {
  answerId: UniqueEntityId;
  attachmentId: UniqueEntityId;
}

export class AnswerAttachment extends Entity<IAnswerAttachment> {
  get answerId() {
    return this.props.answerId;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }

  static create(props: IAnswerAttachment, id?: UniqueEntityId) {
    return new AnswerAttachment(props, id);
  }
}
