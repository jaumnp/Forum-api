import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.ts";
import type { Optional } from "../../../../core/types/options.ts";
import { Comment } from "./comment.ts";
import type { ICommentProps } from "./comment.ts";

export interface IAnswerCommentProps extends ICommentProps {
  answerId: UniqueEntityId;
}

export class AnswerComment extends Comment<IAnswerCommentProps> {
  get answerId() {
    return this.props.answerId;
  }

  static create(
    props: Optional<IAnswerCommentProps, "createdAt">,
    id?: UniqueEntityId,
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return answerComment;
  }
}
