import { ValidationError } from "./ValidationError.js";

export class GraphiteMessage {
  public path: string;
  public value: string;

  constructor(path: string, value: string) {
    this.path = path;
    this.value = value;

    this._validateMessage();
  }

  private _validateMessage() {
    if (typeof this.path !== "string") {
      throw new ValidationError(
        `Expected path to be of type string, but received ${this.path}`
      );
    }

    if (typeof this.value !== "string") {
      throw new ValidationError(
        `Expected value to be of type string, but received ${this.value}`
      );
    }
  }

  public toString() {
    return `${this.path} ${this.value}`;
  }
}
