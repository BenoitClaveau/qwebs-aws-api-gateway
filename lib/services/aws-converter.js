"use strict";

class AWSConverter {

    constructor() {
    }

    toAWS(request, response, routeMethod) {
        
        console.log("[TO AWS] request", request)

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

        let request = {
            method: event.method || event.httpMethod,
            url: event.path.proxy,
            headers: event.headers || {},
            event: event,
            context: context
        };

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