import { Entity } from "../../../../core/entities/entity.ts";
import type { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";

interface IAttachmentProps {
  title: string;
  link: string;
}

export class Attachment extends Entity<IAttachmentProps> {
  get title() {
    return this.props.title;
  }

  get link() {
    return this.props.link;
  }

  static create(props: IAttachmentProps, id: UniqueEntityId) {
    return new Attachment(props, id);
  }
}
