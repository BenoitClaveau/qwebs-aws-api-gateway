/*!
 * QwebsAWSApiGateway
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */

"use strict";

const path = require("path");
const BaseQwebs = require("qwebs");
const Router = require("./router");
const AWSConverter = require("./services/aws-converter");

class Qwebs extends BaseQwebs {
    constructor(options) {
        super(options || { config: {}})
        this.inject("$router", new Router(this)); //replace router service
        this.inject("$awsConverter", new AWSConverter()); //replace router service
    };

    invoke(event, context, callback) {
        let obj = this.resolve("$awsConverter").fromAWS(event, context, callback);
        return super.invoke(obj.request, obj.response);
    };
};

exports = module.exports = Qwebs;
