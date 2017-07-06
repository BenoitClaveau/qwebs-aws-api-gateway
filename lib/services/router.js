/*!
 * qwebs-aws-api-gateway
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
'use strict';

const path = require("path");

const options = {
    dirname: path.resolve(__dirname, ".."),
    config: { 
        routes: "./routes.json"
    }
};

const QwebsFactory = require('qwebs-aws-api-gateway').Create(options);

//define routes
module.exports.handler = (event, context, callback) => {
    return QwebsFactory.then(qwebs => {
        console.log("[EVENT]", event);
        qwebs.invoke(event, context, callback).then(() => {
            console.log("[SUCCESS]");
        }).catch(error => {
            console.log("[ERROR]", error);
            callback(null, {
                statusCode: error.statusCode || 404
            })
        })
    }).catch(error => {
        console.error("[ERROR]", error);
        callback(null, {
            statusCode: error.statusCode || 500
        })
    });
};



