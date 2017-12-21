/*!
 * qwebs-aws-api-gateway
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
'use strict';

const DataError = require('qwebs').DataError;

function ResponseService(event, context, callback, options) {
    if (!event) throw new DataError({ message: "Event is undefined."});
    if (!context) throw new DataError({ message: "Context is undefined."});
    if (!callback) throw new DataError({ message: "Callback is undefined."});
    this.event = event;
    this.event.headers = event.headers || {};
    this.context = context;
    this.callback = callback;
    this.options = options || {};
    this.options.contentType = this.options.contentType || 'application/json';
    this.context.callbackWaitsForEmptyEventLoop = false; 

    this.parseParams();
    this.parseQueryString();
    this.parseBody();
}

ResponseService.prototype.error = function(error) {
    console.error("[ERROR][MESSAGE]", error.message);
    if (error.data) console.error("[ERROR][DATA]", error.data);
    if (error.stack) console.error("[ERROR][STACK]", error.stack);

    //https://aws.amazon.com/fr/blogs/compute/error-handling-patterns-in-amazon-api-gateway-and-aws-lambda/
    
    let body = error.message;
    if (/^application\/json$/gi.test(this.options.contentType)) {
        body = {
            message: error.message,
            stack: error.stack,
            data: error.data,
        }
    }
    else if (/^text\/html$/gi.test(this.options.contentType)) {
        body = `<div>
    <h1>${error.message}</h1>
    <p>${JSON.stringify(error.data)}</p>
</div>
`
    }
    
    this.send({
        statusCode: error.statusCode || 500,
        body: body
    })
}

ResponseService.prototype.send = function(options) {
    let statusCode = options.statusCode || 200;
    let body = options.body;
    if (/application\/json/gi.test(this.options.contentType)) {
        if (typeof body !== "string") body = JSON.stringify(body);
    }

    this.callback(null, {
        statusCode: statusCode,
        headers: {
            "Content-Type": this.options.contentType,
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Request-Method": "*",
            "Access-Control-Request-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent,X-Amzn-Remapped-Authorization",
        },
        body: body
    });

    if (/GET/ig.test(this.event.httpMethod) == false) {
        console.log("[RESPONSE][STATUS CODE]", statusCode);
        console.log("[RESPONSE][BODY]", body);
    }
}

ResponseService.prototype.success = function(body) {
    this.send({ body: body });
}

ResponseService.prototype.parseBody = function() {
    if (/application\/json/gi.test(this.event.headers["content-type"])) {
        if (typeof this.event.body == "string") this.event.body = JSON.parse(this.event.body);
    } 
}

ResponseService.prototype.parseQueryString = function() {
    this.event.querystring = this.event.queryStringParameters;
}

ResponseService.prototype.parseParams = function() {
    this.event.params = this.event.pathParameters;
}

exports = module.exports = ResponseService;