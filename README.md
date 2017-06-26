# qwebs-aws-api-gateway
Qwebs routing for AWS API Gateway

```js
'use strict';

let service = require("./service");

const promise = require('qwebs-aws-api-gateway').Create({ dirname: __dirname, config: "./config.json" });

module.exports.handler = (event, context, callback) => {
    console.log("[EVENT]", event);
    promise.then(qwebs => {
        qwebs.invoke(event, context, callback).then(() => {
        console.log("[SUCCESS]");
    }).catch(error => {
        console.log("[ERROR]", error);
        callback(null, {
            statusCode: error.statusCode || 404
        })
    })
};
```

```config.json
{
    "routes": "./routes.json"
}
```

```routes.json
{
    "services": [
        { "name": "$info", "location": "../services/info"}
    ],
    "locators": [
        { "get": "/info", "service": "$info", "method": "getInfo" }
    ]
}
```