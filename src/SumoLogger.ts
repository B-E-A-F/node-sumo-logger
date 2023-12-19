import { CarbonTwoMessage } from "./CarbonTwoMessage";
import { GraphiteMessage } from "./GraphiteMessage";
import { InvalidParameterError } from "./InvalidParameterError";
import { ValidationError } from "./ValidationError";

type SumoLoggerConfig = {
  endpoint: string;
  sourceName?: string;
  sourceCategory?: string;
  hostName?: string;
};

type ContentType =
  | "application/json"
  | "application/vnd.sumologic.graphite"
  | "application/vnd.sumologic.carbon2";

type Message = GraphiteMessage | CarbonTwoMessage | string;

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
        `Expected endpoint to be of type string, but received ${typeof this
          .options.endpoint}`
      );
    }

    if (
      this.options.sourceName &&
      typeof this.options.sourceName !== "string"
    ) {
      throw new ValidationError(
        `Expected endpoint to be of type string, but received ${typeof this
          .options.sourceName}`
      );
    }

    if (
      this.options.sourceCategory &&
      typeof this.options.sourceCategory !== "string"
    ) {
      throw new ValidationError(
        `Expected endpoint to be of type string, but received ${typeof this
          .options.sourceCategory}`
      );
    }

    if (this.options.hostName && typeof this.options.hostName !== "string") {
      throw new ValidationError(
        `Expected endpoint to be of type string, but received ${typeof this
          .options.hostName}`
      );
    }
  }

  private _buildContentType(message: Message): ContentType {
    if (typeof message === "string") {
      return "application/json";
    }

    if (message instanceof GraphiteMessage) {
      return "application/vnd.sumologic.graphite";
    }

    if (message instanceof CarbonTwoMessage) {
      return "application/vnd.sumologic.carbon2";
    }

    throw new Error("Critical error trying to resolve ContentType");
  }

  private _buildHeaders(
    contentType: ContentType = "application/json"
  ): Headers {
    const headers = new Headers();

    headers.append("Content-Type", contentType);

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

  public async log(message: Message) {
    if (
      typeof message !== "string" &&
      !(message instanceof GraphiteMessage) &&
      !(message instanceof CarbonTwoMessage)
    ) {
      throw new InvalidParameterError(
        "Error invoking log method: Expected message to be of type string | GraphiteMessage | CarbonTwoMessage"
      );
    }

    let messageBody: string;

    if (typeof message === "string") {
      messageBody = message;
    } else {
      messageBody = message.toString();
    }

    return fetch(this.options.endpoint, {
      headers: this._buildHeaders(this._buildContentType(message)),
      body: messageBody,
      method: "POST",
    });
  }
}
