# qwebs-aws-api-gateway
Qwebs routing for AWS API Gateway

```js
'use strict';

let service = require("./service");
const options = {
    dirname: path.resolve(__dirname, ".."),
    config: { 
        routes: "./routes.json"
    }
};

let QwebsFactory = require('qwebs-aws-api-gateway').Create(options);

module.exports.handler = (event, context, callback) => {
    console.log("[EVENT]", event);
    QwebsFactory.then(qwebs => {
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

