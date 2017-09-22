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
    //console.log("[EVENT]", event);
    QwebsFactory.then(qwebs => {
        qwebs.invoke(event, context, callback).then(() => {
        //console.log("[SUCCESS]");
    }).catch(error => {
        //console.log("[ERROR]", error);
        callback(null, {
            statusCode: error.statusCode || 404
        })
    })
};
```

## Others AWS Services
  
  * [$aws-s3](https://www.npmjs.com/package/qwebs-aws-s3)
  * [$aws-ses](https://www.npmjs.com/package/qwebs-aws-ses)

