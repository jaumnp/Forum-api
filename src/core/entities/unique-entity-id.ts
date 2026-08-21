import { randomUUID } from "node:crypto";

export class UniqueEntityId {
  private id;

  constructor(id?: string) {
    this.id = id ?? randomUUID();
  }

  toString() {
    this.id;
  }

  toValue() {
    this.id;
  }
}
