/*!
 * qwebs-aws-api-gateway
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
"use strict";

const path = require("path");
const querystring = require("querystring");
const Get = require("./get");

class Delete extends Get {

    constructor($qwebs, route) {
        super($qwebs, route)
    }
}

exports = module.exports = Delete;