"use strict";

const BaseRouter = require("qwebs/lib/router");
const Get = require("./routes/get");
const Post = require("./routes/post");
const Put = require("./routes/put");
const Patch = require("./routes/patch");
const Delete = require("./routes/delete");

class Router extends BaseRouter {
    constructor($qwebs) {
        super($qwebs);
    }

    get(route) {
        let item = new Get(this.$qwebs, route);
        this.getTree.push(item);
        return item;
    };

    post(route) {
        let item = new Post(this.$qwebs, route);
        this.postTree.push(item);
        return item;
    };

    put(route) {
        let item = new Put(this.$qwebs, route);
        this.putTree.push(item);
        return item;
    };

    patch(route) {
        let item = new Patch(this.$qwebs, route);
        this.patchTree.push(item);
        return item;
    };

    delete(route) {
        let item = new Delete(this.$qwebs, route);
        this.deleteTree.push(item);
        return item;
    };
}

exports = module.exports = Router;