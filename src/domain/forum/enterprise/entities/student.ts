import { Entity } from "../../../../core/entities/entity.ts";
import type { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";

interface IStrundentProps {
  name: string;
}

export class Student extends Entity<IStrundentProps> {
  create(props: IStrundentProps, id?: UniqueEntityId) {
    const student = new Student(props, id);

    return student;
  }
}
