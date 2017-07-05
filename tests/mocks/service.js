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