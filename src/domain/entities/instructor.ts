import { randomUUID } from "node:crypto";
import { Entity } from "../../core/entities/entity.js";

interface IInstructorProps {
  name: string;
}

export class Instructor extends Entity<IInstructorProps> {}
