import { randomUUID } from "node:crypto";
import type { Slug } from "./value-objects/slug.js";
import { Entity } from "../../core/entities/entity.js";

interface IAnswareProps {
  content: string;
  authorId: string;
  questionId: string;
  slug: Slug;
}

export class Answer extends Entity<IAnswareProps> {
  get content() {
    return this.props.content;
  }

  get slug() {
    return this.props.slug;
  }
}
