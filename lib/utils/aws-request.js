/*!
 * qwebs-aws-api-gateway
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
'use strict';

const stream = require("stream");

class AWSRequest extends stream.Readable {
    constructor(event, context) {
        super();
        this.method = event.httpMethod;
        this.url = event.pathParameters.proxy || "";
        this.headers = event.headers || {};
        this.event = event;
        this.context = context;

        //convert to string
        if (typeof event.body !== "string") this._data = JSON.stringify(event.body);
        else this._data = event.body || "";
    };

    _read(size) {
        if (!this._data) this.push(null)
        else {
            this.push(this._data.slice(0, size))
            this._data = this._data.slice(size)
        }
    };
};

exports = module.exports = AWSRequest;