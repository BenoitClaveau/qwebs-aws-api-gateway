/*!
 * qwebs-aws-api-gateway
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
"use strict";

const path = require("path");
const querystring = require("querystring");
const Post = require("./post");

class Patch extends Post {
    constructor($qwebs, route) {
        super($qwebs, route)
    }
}

exports = module.exports = Patch;