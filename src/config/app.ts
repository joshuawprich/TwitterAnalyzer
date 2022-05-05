import * as Koa from "koa";
import * as logger from "koa-logger";
import * as bodyParser from "koa-bodyparser";
import HttpStatus from "http-status-codes";

import indexController from "../routes/index.controller";
import routeController from "../routes/test.controller";

const app: Koa = new Koa();

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
app.use(routeController.routes());
app.use(routeController.allowedMethods());

export default app;
