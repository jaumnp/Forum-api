import { randomUUID } from "node:crypto";

export class UniqueEntityId {
  private id;

  protected constructor(id?: string) {
    this.id = id ?? randomUUID();
  }

  static create(id?: string) {
    return new UniqueEntityId(id ?? undefined);
  }

  toString() {
    return this.id;
  }

  toValue() {
    return this.id;
  }
}
