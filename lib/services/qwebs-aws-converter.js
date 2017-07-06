/*!
 * qwebs-aws-api-gateway
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
"use strict";

const DataError = require("qwebs").DataError;
const querystring = require("querystring");
const AWSConverter = require("./aws-converter");

class QwebsAWSConverter extends AWSConverter {

    constructor($config) {
        super($config);
    }

    toAWS(request, response, routeMethod) {
        
        request.event = {
            httpMethod: request.method,
            pathParameters: {
                proxy: request.url
            },
            headers: request.headers
        }
        if (request.body) request.event.body = request.body;

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
                response.send(res);
            }
        }

        return super.toAWS(request, response, routeMethod);
    }
}

exports = module.exports = QwebsAWSConverter;