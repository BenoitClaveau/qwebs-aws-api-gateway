"use strict";

const DataError = require("qwebs").DataError;
const querystring = require("querystring");

class AWSConverter {

    constructor() {
    }

    toAWS(request, response, routeMethod) {
        
        console.log("[TO AWS] request", request)
        if (!request) throw new DataError({ message: "Request is not defined." });
        if (!response) throw new DataError({ message: "Response is not defined." });
        if (!routeMethod) throw new DataError({ routeMethod: "Route method is not defined." });

        let event = request.event;
        let context = request.context;
        let callback = response.callback;

        if (!request.params) event.resource = routeMethod.route
        else {
            event.pathParameters = request.params;
            event.resource = Object.keys(request.params).reduce((previous, current) => {
                previous = previous.replace(`:${current}`, `{${current}}`); //TODO use regex for subwords
                return previous;
            }, routeMethod.route);
        }

        if (request.query) event.queryStringParameters = request.query;

        console.log("[TO AWS] event", event)
        console.log("[TO AWS] context", context)
        console.log("[TO AWS] callback", callback)

        return {
            event: event,
            context: context,
            callback: callback
        };
    }

    fromAWS(event, context, callback) {
        
        console.log("[FROM AWS] event", event)
        console.log("[FROM AWS] context", context)
        console.log("[FROM AWS] callback", callback)

        if (!event) throw new DataError({ message: "Event is not defined." });
        if (!event.pathParameters) throw new DataError({ message: "Event pathParameters is not defined. Use integration: lambda-proxy." });
        if (!event.pathParameters.proxy) throw new DataError({ message: "Event pathParameters proxy is not defined. Use integration: lambda-proxy." });
        if (!event.httpMethod) throw new DataError({ message: "Event httpMethod is not defined. Use integration: lambda-proxy." });
        if (!context) throw new DataError({ message: "Context is not defined." });
        if (!callback) throw new DataError({ message: "Callback is not defined." });

        let request = {
            method: event.httpMethod,
            url: event.pathParameters.proxy,
            headers: event.headers || {},
            event: event,
            context: context
        };

        if (event.queryStringParameters) request.url += querystring.stringify(event.queryStringParameters);

        console.log("[FROM AWS] request", request)
        
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