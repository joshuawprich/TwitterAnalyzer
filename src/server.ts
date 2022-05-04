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

// Initial route
app.use(async (ctx: Koa.Context) => {
  ctx.body = "Hello world";
});

// router.get("/", async (ctx: Koa.Context) => {
//   const name = ctx.query.name || "stranger";
//   ctx.body = {
//     message: `Hello, ${name}!`
//   };
// });

app
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT, () => console.log(`listening on http://localhost:${PORT}...`));
