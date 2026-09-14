export class Failure<S, F> {
  readonly value: F;

  constructor(value: F) {
    this.value = value;
  }

  isSuccess(): this is Success<S, F> {
    return false;
  }

  isFailure(): this is Failure<S, F> {
    return true;
  }
}

export class Success<S, F> {
  readonly value: S;

  constructor(value: S) {
    this.value = value;
  }

  isSuccess(): this is Success<S, F> {
    return true;
  }

  isFailure(): this is Failure<S, F> {
    return false;
  }
}

export type Either<S, F> = Success<S, F> | Failure<S, F>;

export const success = <S>(value: S): Either<S, never> => {
  return new Success(value);
};

export const failure = <F>(value: F): Either<never, F> => {
  return new Failure(value);
};
