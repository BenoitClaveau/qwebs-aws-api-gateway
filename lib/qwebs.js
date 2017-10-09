/*!
 * QwebsAWSApiGateway
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 * 
 *  * QWEBS -> AWS -> QWEBS
 */
"use strict";

const path = require("path");
const Qwebs = require("qwebs");
const DataError = require("qwebs").DataError;
const Router = require("./router");
const QwebsConverter = require("./services/qwebs-converter");

class QwebsAwsQwebs extends Qwebs {

    constructor(options) {
        if(!options) throw new DataError({ message: "Options is not defined." });
        if(!options.config) throw new DataError({ message: "Options config is not defined." });
        super(options);
        
        this.inject("$router", new Router(this)); //replace router service
        this.inject("$awsConverter", new QwebsConverter(this)); //replace router service

        if(!$config.http) throw new DataError({ message: "Http section must be defined in config file." });
        if ($config.http) this.inject("$http", "qwebs-http");   //avoid to add qwebs-http in config.json
    };
};

exports = module.exports = QwebsAwsQwebs;
