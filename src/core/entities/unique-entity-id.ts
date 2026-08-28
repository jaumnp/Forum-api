import { randomUUID } from "node:crypto";

export class UniqueEntityId {
  private id;

  constructor(id?: string) {
    this.id = id ?? randomUUID();
  }

  toString() {
    return this.id;
  }

  toValue() {
    return this.id;
  }
}
