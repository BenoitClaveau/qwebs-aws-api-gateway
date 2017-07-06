/*!
 * qwebs
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
'use strict';

module.exports = require('./lib/aws-qwebs');            //use in aws api gateway
module.exports.Server = require('./lib/qwebs');         //use locally to create a Qwebs server locally and call your lambda method
module.exports.Response = require('./lib/services/aws-response');