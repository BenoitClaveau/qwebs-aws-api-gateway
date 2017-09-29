# qwebs-aws-api-gateway

Qwebs routing for AWS API Gateway

```js
const path = require("path");
const QwebsAwsApiGateway = require('qwebs-aws-api-gateway');
let qwebs = null;

new QwebsAwsApiGateway({
    dirname: path.resolve(__dirname, ".."),
    config: { 
        routes: "./routes.json"
    }
}).load().then(instance => {
    qwebs = instance;
})

module.exports.handler = (event, context, callback) => {
    if (!qwebs) return callback(null, { statusCode: 503 });
    qwebs.invoke(event, context, callback).catch(error => {
        callback(null, { statusCode: error.statusCode || 404 })
    })
};

```

## Others AWS Services
  
  * [$aws-s3](https://www.npmjs.com/package/qwebs-aws-s3)
  * [$aws-ses](https://www.npmjs.com/package/qwebs-aws-ses)

