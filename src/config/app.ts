import * as Koa from "koa";
import * as logger from "koa-logger";
import * as bodyParser from "koa-bodyparser";
import HttpStatus from "http-status-codes";

// Routes for the application
import indexController from "../routes/index.controller";
import tweetsController from "../routes/tweets/tweets.controller";
import { initRedisClient } from "../redis";

// Environment variables
require("dotenv").config();

// App
const app: Koa = new Koa();

//Redis
const redisClient = initRedisClient();
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    ctx.redis = redisClient;
    await next();
  } catch (err) {
    ctx.status =
      err.statusCode || err.status || HttpStatus.INTERNAL_SERVER_ERROR;
    err.status = ctx.status;
    ctx.body = { err };
    ctx.app.emit("error", err, ctx);
  }
});

//Generic error handling
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (err) {
    ctx.status =
      err.statusCode || err.status || HttpStatus.INTERNAL_SERVER_ERROR;
    err.status = ctx.status;
    ctx.body = { err };
    ctx.app.emit("error", err, ctx);
  }
});

app.use(logger());
app.use(bodyParser());

// Routes
app.use(indexController.routes());
app.use(indexController.allowedMethods());
app.use(tweetsController.routes());
app.use(tweetsController.allowedMethods());

export default app;
