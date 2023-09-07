export class ArgumentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class EmailNotFoundError extends NotFoundError {
  constructor(message = "Email not found") {
    super(message);
    this.name = this.constructor.name;
  }
}

export class PasswordIncorrectError extends ArgumentError {
  constructor(message = "Password incorrect") {
    super(message);
    this.name = this.constructor.name;
  }
}

export class InternalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class DBError extends InternalError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class DecrementWordLevelError extends DomainError {
  constructor(message = "Word level cannot be less than 1") {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ExternalServiceError extends InternalError {
  externalServiceName: string;
  constructor(message: string, externalServiceName = "Unknown") {
    super(message);
    this.externalServiceName = externalServiceName;
  }
}

export class MicroserviceError extends InternalError {
  microserviceName: string;
  constructor(message: string, microserviceName = "Unknown") {
    super(message);
    this.microserviceName = microserviceName;
  }
}

export class UserError {
  userMessage: string;
  constructor(userMessage: string) {
    this.userMessage = userMessage;
  }
}

export class UserErrorInternal {
  userMessage: string;
  constructor() {
    this.userMessage =
      "Something went wrong on the server, please try again later, we are working on it.";
  }
}

export class UserErrorArgument extends UserError {
  constructor(message: string) {
    super("Argument error: " + message);
  }
}
