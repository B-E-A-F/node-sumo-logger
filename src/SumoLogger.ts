import { CarbonTwoMessage } from "./CarbonTwoMessage";
import { GraphiteMessage } from "./GraphiteMessage";
import { InvalidParameterError } from "./InvalidParameterError";
import { ValidationError } from "./ValidationError";

type SumoLoggerConfig = {
  endpoint: string;
  contentType?: "graphite" | "carbon2" | "json";
  sourceName?: string;
  sourceCategory?: string;
  hostName?: string;
};

export class SumoLogger {
  private options: SumoLoggerConfig;
  constructor(options: SumoLoggerConfig) {
    this.options = options;

    this._validateOptions();
  }

  private _validateOptions() {
    if (typeof this.options !== "object") {
      throw new ValidationError("Options have not been provided to SumoLogger");
    }

    if (typeof this.options.endpoint !== "string") {
      throw new ValidationError(
        `Expected endpoint to be of type string, but received ${this.options.endpoint}`
      );
    }

    if (
      this.options.contentType &&
      typeof this.options.contentType !== "string"
    ) {
      throw new ValidationError(
        `Expected endpoint to be of type string, but received ${this.options.contentType}`
      );
    }

    if (
      this.options.sourceName &&
      typeof this.options.sourceName !== "string"
    ) {
      throw new ValidationError(
        `Expected endpoint to be of type string, but received ${this.options.sourceName}`
      );
    }

    if (
      this.options.sourceCategory &&
      typeof this.options.sourceCategory !== "string"
    ) {
      throw new ValidationError(
        `Expected endpoint to be of type string, but received ${this.options.sourceCategory}`
      );
    }

    if (this.options.hostName && typeof this.options.hostName !== "string") {
      throw new ValidationError(
        `Expected endpoint to be of type string, but received ${this.options.hostName}`
      );
    }
  }

  private _buildHeaders(): Headers {
    const headers = new Headers();

    if (this.options.contentType !== "json") {
      headers.append(
        "Content-Type",
        `application/vnd.sumologic.${this.options.contentType}`
      );
    } else {
      headers.append("Content-Type", "application/json");
    }

    if (this.options.sourceName) {
      headers.append("X-Sumo-Name", this.options.sourceName);
    }

    if (this.options.sourceCategory) {
      headers.append("X-Sumo-Category", this.options.sourceCategory);
    }

    if (this.options.hostName) {
      headers.append("X-Sumo-Host", this.options.hostName);
    }

    return headers;
  }

  public async log(message: GraphiteMessage | CarbonTwoMessage | string) {
    if (
      typeof message !== "string" &&
      !(message instanceof GraphiteMessage) &&
      !(message instanceof CarbonTwoMessage)
    ) {
      throw new InvalidParameterError(
        `Error invoking log method: Expected message to be of type string, but received ${message}`
      );
    }

    let messageBody: string;

    if (typeof message === "string") {
      messageBody = message;
    } else {
      messageBody = message.toString();
    }

    return fetch(this.options.endpoint, {
      headers: this._buildHeaders(),
      body: messageBody,
      method: "POST",
    });
  }
}
