/*!
 * qwebs-aws-api-gateway
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
'use strict';

let DataError = require('qwebs').DataError;
let AWS = require('aws-sdk');
AWS.config.setPromisesDependency(Promise);

function AwsSesService($config) {
    if (!$config) throw new DataError({ message: "$config is not defined." });
    if (!$config.aws) throw new DataError({ message: "AWS config is not defined." });
    if (!$config.aws.ses) throw new DataError({ message: "AWS SES config is not defined." });
    if (!$config.aws.ses.apiVersion) throw new DataError({ message: "AWS SES api version is not defined." });
    if (!$config.aws.ses.region) throw new DataError({ message: "AWS SES region is not defined." });
    this.$config = $config;

    this.ses = new AWS.SES({ 
        apiVersion: $config.aws.ses.apiVersion, 
        region: $config.aws.ses.region
    });
}

AwsSesService.prototype.sendEmail = function(options) {
    options = options || {};
    return Promise.resolve().then(() => {
        if (!options.to) throw new WebError(500, "To is not defined.");
        if (!options.subject) throw new WebError(500, "Subject is not defined.");
        if (!options.html) throw new WebError(500, "Html is not defined.");
        if (this.$config.aws.ses.mock) return; //for unit testing
        
        let params = {
            Source: options.from || this.$config.aws.ses.from,
            Destination: {
                ToAddresses: [options.to]
            },
            Message: {
                Subject: {
                    Data: options.subject
                },
                Body: {
                    Html: {
                        Data: options.html
                    }
                }
            }
        };
        if (!params.Source) throw new DataError({ message: "Email source is not defined." });
        
        return this.ses.sendEmail(params).promise();
    });
};



exports = module.exports = new AwsSesService();