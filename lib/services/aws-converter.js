"use strict";

class AWSConverter {

    constructor() {
    }

    toAWS(request, response, routeMethod) {
        
        let event = request.event;
        let content = request.content;
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

        return {
            event: event,
            content: content,
            callback: callback
        };
    }

    fromAWS(event, context, callback) {
        
        let request = {
            method: event.httpMethod,
            url: event.path.proxy,
            event: event,
            context: context
        };
        
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