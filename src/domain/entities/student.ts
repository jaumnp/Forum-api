import { Entity } from "../../core/entities/entity.js";

interface IStrundentProps {
  name: string;
}

export class Student extends Entity<IStrundentProps> {}
