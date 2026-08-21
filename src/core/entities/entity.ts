import { randomUUID } from "node:crypto";
import { UniqueEntityId } from "./unique-entity-id.js";

export class Entity<Props> {
  private _id: UniqueEntityId;
  protected props: Props;

  constructor(props: Props, id?: string) {
    this._id = new UniqueEntityId(id);
    this.props = props;

    console.log(this.props);
  }

  get id() {
    return this._id;
  }
}
