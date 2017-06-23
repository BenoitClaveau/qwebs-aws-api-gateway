"use strict";

const path = require("path");
const querystring = require("querystring");
const BasePut = require("qwebs/lib/routes/put");

class Put extends BasePut {

    constructor($qwebs, route) {
        super($qwebs, route)
    }

    register(serviceName, methodName) {
        super.register(serviceName, methodName);
        this.load();
    }

    invoke (request, response) {        
        return Promise.resolve().then(() => {
            if (!this.method) throw new DataError({ message: "Method is not defined.", data: { route: this.route }});
            
            request.query = querystring.parse(request.part.query) || {};
            let obj = this.$qwebs.resolve("$awsConverter").toAWS(request, response, this);
            return this.method.call(this.service, obj.event, obj.content, obj.callback);
        });
    };
}

exports = module.exports = Put;