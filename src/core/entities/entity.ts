import { UniqueEntityId } from "./unique-entity-id.js";

export class Entity<Props> {
  private _id: UniqueEntityId;
  protected props: Props;

  protected constructor(props: Props, id?: UniqueEntityId) {
    this._id = id ?? UniqueEntityId.create();
    this.props = props;
  }

  get id() {
    return this._id;
  }

  public equals(entity: Entity<any>) {
    if (entity == this) return true;
    if (entity.id == this._id) return true;

    return false;
  }
}
