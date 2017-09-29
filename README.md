# qwebs-aws-api-gateway

Qwebs routing for AWS API Gateway

```js
const path = require("path");
const QwebsAwsApiGateway = require('qwebs-aws-api-gateway');

const instance = QwebsAwsApiGateway.create({
    dirname: path.resolve(__dirname, ".."),
    config: { 
        routes: "./routes.json"
    }
});

module.exports.handler = (event, context, callback) => {
    return instance.then(qwebs => {
        return qwebs.invoke(event, context, callback);
    }).catch(error => {
        callback(null, { statusCode: error.statusCode || 404 })
    })
};

```

## Others AWS Services
  
  * [$aws-s3](https://www.npmjs.com/package/qwebs-aws-s3)
  * [$aws-ses](https://www.npmjs.com/package/qwebs-aws-ses)

