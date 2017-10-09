/*!
 * QwebsAWSApiGateway
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 * 
 * AWS -> QWEBS -> AWS
 */
"use strict";

const path = require("path");
const Qwebs = require("qwebs");
const { Singleton } = require("qwebs");
const Router = require("./router");
const AWSConverter = require("./services/aws-converter");

class AwsQwebs extends Qwebs {

    static create(options) {
        return Singleton.init(() => new AwsQwebs(options));
    }

    constructor(options) {
        super(options || { config: {}})
        this.inject("$router", new Router(this)); //replace router service
        this.inject("$awsConverter", new AWSConverter(this)); //replace router service
    };

    invoke(event, context, callback) {
        let obj = this.resolve("$awsConverter").fromAWS(event, context, callback);
        return super.invoke(obj.request, obj.response);
    };
};

exports = module.exports = AwsQwebs;