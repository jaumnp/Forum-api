import { Entity } from "../../../../core/entities/entity.js";
import type { UniqueEntityId } from "../../../../core/entities/unique-entity-id.js";

interface IInstructorProps {
  name: string;
}

export class Instructor extends Entity<IInstructorProps> {
  create(props: IInstructorProps, id?: UniqueEntityId) {
    const instructor = new Instructor(props, id);

    return instructor;
  }
}
