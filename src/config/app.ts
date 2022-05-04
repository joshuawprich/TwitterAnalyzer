import * as Koa from "koa";
import * as Router from "koa-router";
import * as logger from "koa-logger";
import * as bodyParser from "koa-bodyparser";
import HttpStatus from "http-status-codes";

const PORT = process.env.PORT || 8000;

const app: Koa = new Koa();
const router = new Router();

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

// Initial route
app.use(async (ctx: Koa.Context) => {
  ctx.body = "Hello world";
});

export default app;
