/*!
 * qwebs-aws-api-gateway
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
"use strict";

const path = require("path");
const querystring = require("querystring");
const BaseGet = require("qwebs/lib/routes/get");

class Get extends BaseGet {

    constructor($qwebs, route) {
        super($qwebs, route)
    }

    register(serviceName, methodName) {
        super.register(serviceName, methodName);
        this.load();
    }

    invoke (request, response) {        
        return this.invokeAsAWSLambda(request, response);
    };

    invokeAsAWSLambda (request, response) {        
        return Promise.resolve().then(() => {
            if (!this.method) throw new DataError({ message: "Method is not defined.", data: { route: this.route }});
            
            request.query = querystring.parse(request.part.query) || {};
            let obj = this.$qwebs.resolve("$awsConverter").toAWS(request, response, this);
            return this.method.call(this.service, obj.event, obj.context, obj.callback);
        });
    };
}

exports = module.exports = Get;