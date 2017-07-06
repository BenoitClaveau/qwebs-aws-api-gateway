/*!
 * qwebs-aws-api-gateway
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
'use strict';

module.exports.dummy = (event, context, callback) => {
    callback(null, {
        statusCode: 200,
        body: {
            service: "dummy",
            event: event
        }
    });
};