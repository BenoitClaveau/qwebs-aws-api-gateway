/*!
 * QwebsAWSApiGateway
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 * 
 * AWS -> QWEBS -> AWS
 */
"use strict";

const path = require("path");
const BaseQwebs = require("qwebs");
const Router = require("./router");
const AWSConverter = require("./services/aws-converter");

let qwebs = null; //intance is store in the module to avoid reloading (due to aws api gateway)
let lock = false;

class Qwebs extends BaseQwebs {

    static create(options) {
        return Promise.resolve({}).then(() => {
            lock = true;
            if (qwebs) return;
            return new Qwebs(options).load().then(i => {
                qwebs = i;
            });
        }).then(() => {
            lock = false;
            return qwebs;
        }).catch(error => {
            lock = false;
            throw error;
        });
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

exports = module.exports = Qwebs;