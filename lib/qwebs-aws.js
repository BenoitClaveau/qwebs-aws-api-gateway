/*!
 * QwebsAWSApiGateway
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 * 
 *  * QWEBS -> AWS -> QWEBS
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
        var $config = this.resolve("$config");
        this.inject("$awsConverter", new AWSConverter($config)); //replace router service
    };

    static Create(options) {
        return Promise.resolve({}).then(() => {
            if (Qwebs.instance) return Qwebs.instance;
            let qwebs = new Qwebs(options);
            return qwebs.load().then(() => {
                Qwebs.instance = qwebs;
                return Qwebs.instance;
            });
        });
    }
};

exports = module.exports = Qwebs;
