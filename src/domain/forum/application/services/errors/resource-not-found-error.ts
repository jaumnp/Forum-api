import type { IServicesError } from "../../../../../core/errors/services-error.ts";

export class ResourceNotFoundError extends Error implements IServicesError {
  constructor(message = "Resource not found") {
    super(message);
  }
}
