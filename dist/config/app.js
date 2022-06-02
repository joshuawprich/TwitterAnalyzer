"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const http_status_codes_1 = require("http-status-codes");
const index_controller_1 = require("../routes/index.controller");
const tweets_controller_1 = require("../routes/tweets.controller");
require("dotenv").config();
const app = new Koa();
//Generic error handling
app.use(async (ctx, next) => {
    try {
        await next();
    }
    catch (err) {
        ctx.status =
            err.statusCode || err.status || http_status_codes_1.default.INTERNAL_SERVER_ERROR;
        err.status = ctx.status;
        ctx.body = { err };
        ctx.app.emit("error", err, ctx);
    }
});
app.use(logger());
app.use(bodyParser());
// Routes
app.use(index_controller_1.default.routes());
app.use(index_controller_1.default.allowedMethods());
app.use(tweets_controller_1.default.routes());
app.use(tweets_controller_1.default.allowedMethods());
exports.default = app;
