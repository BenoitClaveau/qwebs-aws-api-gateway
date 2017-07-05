/*!
 * qwebs
 * Copyright(c) 2016 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
"use strict";

const Qwebs = require('../lib/qwebs');
const Client = require('qwebs').Client;
const service = require('./mocks/service');

describe("router", () => {
    
    beforeAll(() => {
        Qwebs.Create({ dirname: __dirname, config: "./config.json" });
    })

    it("config.json", done => {
        let client = new Client();
        client.get({ url: "http://localhost:3000/dummy/33"}).then(res => {
            expect(res.statusCode).toEqual(200);
            let body = JSON.parse(res.body);
            expect(body.event.pathParameters.id).toEqual("33");
            expect(body.event.headers.host).toEqual("localhost:3000"); //header must be in lower case
        }).catch(fail).then(done);
    }, 10000);
});