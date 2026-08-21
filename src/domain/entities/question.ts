import { randomUUID } from "node:crypto";
import type { Slug } from "./value-objects/slug.js";
import { Entity } from "../../core/entities/entity.js";

interface IQuestionProps {
  title: string;
  content: string;
  authorId: string;
  slug: Slug;
}

export class Question extends Entity<IQuestionProps> {}

console.log(Question);
