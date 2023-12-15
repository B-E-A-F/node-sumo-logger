# sumo-logger.js

`sumo-logger.js` is a zero dependency logging library for sumo logic. It was built as a solution to [js-sumo-logger](https://github.com/SumoLogic/js-sumo-logger) no longer being maintained efficiently.

## Table of Contents

- [Installation](#installation)
- [Motive](#motive)
- [Usage](#usage)
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

// Send logs in parallel
await Promise.allSettled(
  ["logOne", "logTwo"].map((myLog) => sumoLogger.log(myLog))
);
```

Sending a metric via Graphite:

```typescript
import { SumoLogger, GraphiteMessage } from "sumo-logger.js";

const graphiteMessage = new GraphiteMessage("myAwesomePath", "myValue");

await sumoLogger.log(graphiteMessage);
```

Sending a metric via Carbon 2.0:

```typescript
import { SumoLogger, CarbonTwoMessage } from "sumo-logger.js";

const carbonTwoMessage = new CarbonTwoMessage(
  "myIntrinsicTag",
  "myMetaTag",
  "myValue"
);

await sumoLogger.log(carbonTwoMessage);
```

## Contributing

Submit issues, and PRs as you wish. Forking is not necessary.

## License

`sumo-logger.js` is released under the [MIT License](https://opensource.org/licenses/MIT).
