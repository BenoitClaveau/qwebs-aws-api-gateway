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
const DataError = require("qwebs").DataError;
const Router = require("./router");
const QwebsAWSConverter = require("./services/qwebs-aws-converter");

class Qwebs extends BaseQwebs {
    constructor(options) {
        if(!options) throw new DataError({ message: "Options is not defined." });
        if(!options.config) throw new DataError({ message: "Options config is not defined." });
        super(options);
        
        this.inject("$router", new Router(this)); //replace router service
        var $config = this.resolve("$config");
        this.inject("$awsConverter", new QwebsAWSConverter($config)); //replace router service

        if(!$config.http && !$config.https) throw new DataError({ message: "Http or https section must be defined in config file." });
        if ($config.http) this.inject("$http", "qwebs-http");
        if ($config.https) this.inject("$http", "qwebs-https");
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
