/*!
 * qwebs-aws-api-gateway
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
"use strict";

const DataError = require("qwebs").DataError;
const querystring = require("querystring");
const AWSRequest = require("../utils/aws-request");

class AWSConverter {

    constructor($config) {
        if (!$config) throw new DataError({ message: "$config is not defined." });
        this.$config = $config;
    }

    toAWS(request, response, routeMethod) {
        
        //if (this.$config.debug) console.log("[TO AWS] request", request);
        if (!request) throw new DataError({ message: "Request is not defined." });
        if (!response) throw new DataError({ message: "Response is not defined." });
        if (!routeMethod) throw new DataError({ routeMethod: "Route method is not defined." });

        let event = request.event;
        delete request.event;

        let context = request.context;
        delete request.context;

        let callback = response.callback;
        delete request.callback;

        if (!request.params) event.resource = routeMethod.route
        else {
            event.pathParameters = request.params;
            event.resource = Object.keys(request.params).reduce((previous, current) => {
                previous = previous.replace(`:${current}`, `{${current}}`); //TODO use regex for subwords
                return previous;
            }, routeMethod.route);
        }

        if (request.query) event.queryStringParameters = request.query;

        //convert to lower-case as node.js standard
        event.headers = Object.keys(event.headers || {}).reduce((previous, current) => {
            previous[current.toLowerCase()] = event.headers[current];
            return previous;
        }, {});

        // if (this.$config.debug) console.log("[TO AWS] event", event)
        // if (this.$config.debug) console.log("[TO AWS] context", context)
        // if (this.$config.debug) console.log("[TO AWS] callback", callback)

        return {
            event: event,
            context: context,
            callback: callback
        };
    }

    fromAWS(event, context, callback) {
        
        // if (this.$config.debug) console.log("[FROM AWS] event", event)
        // if (this.$config.debug) console.log("[FROM AWS] context", context)
        // if (this.$config.debug) console.log("[FROM AWS] callback", callback)

        if (!event) throw new DataError({ message: "Event is not defined." });
        if (!event.pathParameters) throw new DataError({ message: "Event pathParameters is not defined. Use integration: lambda-proxy." });
        if (!event.httpMethod) throw new DataError({ message: "Event httpMethod is not defined. Use integration: lambda-proxy." });
        if (!context) throw new DataError({ message: "Context is not defined." });
        if (!callback) throw new DataError({ message: "Callback is not defined." });

        let request = new AWSRequest(event, context);

        if (event.queryStringParameters) request.url += "?" +  querystring.stringify(event.queryStringParameters);

        if (this.$config.debug) console.log("[FROM AWS] request", request)
        
        let response = {
            callback: callback
        }

        return {
            request: request,
            response: response
        };  
    };
}

exports = module.exports = AWSConverter;