# sumo-logger.js

<p align=center >
   <img src="https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg" alt="npm version" height="20">
  <a href="https://www.npmjs.com/package/sumo-logger.js"><img src="https://badge.fury.io/js/sumo-logger.js.svg" alt="npm version" height="20"></a>
  <a href="https://twitter.com/Archer_Script" target="_parent">
    <img alt="Twitter" height=20 src="https://img.shields.io/twitter/follow/Archer_Script.svg?style=&logo=twitter&logoColor=white&label=@Archer_Script&labelColor=%231DA1F2&color=%231DA1F2" />
  </a>
</p>

`sumo-logger.js` is a zero dependency logging library for sumo logic. It was built as a solution to [js-sumo-logger](https://github.com/SumoLogic/js-sumo-logger) no longer being maintained efficiently.

## Table of Contents

- [Installation](#installation)
- [Motive](#motive)
- [Usage](#usage)
- [ESM](#esm)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install sumo-logger.js
```

## Motive

- No longer worry about peer dependencies going out of date
- Send minimal logs without the bulk of always sending `timestamps` and `sessionIds`
- Simplified API makes sending logs a breeze
  - No more worries about flushing logs, just send the logs you want to send!

## Usage

Setup your SumoLogger configuration:

```typescript
import { SumoLogger } from "sumo-logger.js";

const sumoLogger = new SumoLogger({
  endpoint: "https://[SumoEndpoint]/receiver/v1/http/[UniqueHTTPCollectorCode]",
  sourceName: "mySourceName",
  sourceCategory: "mySourceCategory",
  hostName: "myHostName",
});
```

Sending a regular log:

```typescript
await sumoLogger.log("myVeryAwesomeLog!");
await sumoLogger.log(JSON.stringify({ myAwesome: "log" }));

// Send multiple logs
await sumoLogger.log(["logOne", "logTwo"].join("\n"));
```

Sending a metric via Graphite:

```typescript
import { GraphiteMessage } from "sumo-logger.js";

const graphiteMessage = new GraphiteMessage("myAwesomePath", "myValue");

await sumoLogger.log(graphiteMessage);

// Send multiple logs
await sumoLogger.log(
  [graphiteMessage.toString(), graphiteMessage.toString()].join("\n")
);
```

Sending a metric via Carbon 2.0:

```typescript
import { CarbonTwoMessage } from "sumo-logger.js";

const carbonTwoMessage = new CarbonTwoMessage(
  "myIntrinsicTag",
  "myMetaTag",
  "myValue"
);

await sumoLogger.log(carbonTwoMessage);

// Send multiple logs
await sumoLogger.log(
  [carbonTwoMessage.toString(), carbonTwoMessage.toString()].join("\n")
);
```

## ESM

`sumo-logger.js` is a pure ESM package. Please refer to [this link](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) if you are using CommonJS.

## Contributing

Submit issues, and PRs as you wish. Forking is not necessary.

## License

`sumo-logger.js` is released under the [MIT License](https://opensource.org/licenses/MIT).
