"use strict";

const DataError = require("qwebs").DataError;
const querystring = require("querystring");
const AWSConverter = require("./aws-converter");

class QwebsAWSConverter extends AWSConverter {

    constructor() {
        super();
    }

    toAWS(request, response, routeMethod) {
        
        request.event = {
            httpMethod: request.method,
            pathParameters: {
                proxy: request.url
            },
            headers: request.headers
        }

        request.context = {
        };

        response.callback = (err, res) => {
            if (err) {
                if (!err instanceof DataError) err = new DataError(error);
                err.request = request;
                response.send(err);
            }
            else {
                res.request = request;
                res.content = res.body;

                if (/application\/json/gi.test(res.headers["Content-Type"])) {
                    if (typeof res.content == "string") res.content = JSON.parse(res.content);
                }
                
                response.send(res);
            }
        }

        return super.toAWS(request, response, routeMethod);
    }
}

exports = module.exports = QwebsAWSConverter;