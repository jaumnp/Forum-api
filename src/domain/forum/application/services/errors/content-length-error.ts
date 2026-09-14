import type { IServicesError } from "../../../../../core/errors/services-error.ts";

export class ContentLengthError extends Error implements IServicesError {
  constructor() {
    super("Maximun content length reached!");
  }
}
