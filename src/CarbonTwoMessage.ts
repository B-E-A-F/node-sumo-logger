import { ValidationError } from "./ValidationError";

export class CarbonTwoMessage {
  public intrinsicTags: string;
  public metaTags: string;
  public value: string;

  constructor(intrinsicTags: string, metaTags: string, value: string) {
    this.intrinsicTags = intrinsicTags;
    this.metaTags = metaTags;
    this.value = value;

    this._validateMessage();
  }

  private _validateMessage() {
    if (typeof this.intrinsicTags !== "string") {
      throw new ValidationError(
        `Expected intrinsicTags to be of type string, but received ${this.intrinsicTags}`
      );
    }

    if (typeof this.metaTags !== "string") {
      throw new ValidationError(
        `Expected metaTags to be of type string, but received ${this.metaTags}`
      );
    }

    if (typeof this.value !== "string") {
      throw new ValidationError(
        `Expected value to be of type string, but received ${this.value}`
      );
    }
  }

  public toString() {
    return `${this.intrinsicTags}  ${this.metaTags}  ${this.value}`;
  }
}
