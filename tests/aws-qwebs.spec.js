/*!
 * qwebs
 * Copyright(c) 2016 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
"use strict";

const Qwebs = require('../lib/aws-qwebs');
const service = require('./mocks/service');

describe("router", () => {
    
    // it("static path", done => {
    //     return new Promise((resolve, reject) => {
    //         let qwebs = new Qwebs();
    //         qwebs.get("test/33", service, "dummy");
    //         let event = {
    //             httpMethod: "GET",
    //             path: {
    //                 proxy: "test/33"
    //             }
    //         }
    //         let context = {};
    //         let callback = (error, res) => {
    //             expect(res.statusCode).toEqual(200);
    //             expect(res.body.event.path.proxy).toEqual("test/33");
    //             resolve(this);
    //         }
    //         qwebs.invoke(event, context, callback);
    //     }).catch(fail).then(done);
    // });

    // it("dynamic path", done => {
    //     return new Promise((resolve, reject) => {
    //         let qwebs = new Qwebs();
    //         qwebs.get("test/:id", service, "dummy");
    //         let event = {
    //             httpMethod: "GET",
    //             path: {
    //                 proxy: "test/33"
    //             }
    //         }
    //         let context = {};
    //         let callback = (error, res) => {
    //             expect(res.statusCode).toEqual(200);
    //             expect(res.body.event.pathParameters.id).toEqual("33");
    //             expect(res.body.event.path.proxy).toEqual("test/33");
    //             resolve(this);
    //         }
    //         qwebs.invoke(event, context, callback);
    //     }).catch(fail).then(done);
    // });

    it("config.json", done => {
        return new Qwebs({ dirname: __dirname, config: "./config.json" }).load().then(qwebs => {;
            return new Promise((resolve, reject) => {
                let event = {
                    httpMethod: "GET",
                    path: {
                        proxy: "dummy/33"
                    }
                }
                let context = {};
                let callback = (error, res) => {
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.event.pathParameters.id).toEqual("33");
                    expect(res.body.event.path.proxy).toEqual("dummy/33");
                    resolve(this);
                }
                
                qwebs.invoke(event, context, callback);
            });
        }).catch(fail).then(done);
    }, 10000);
});