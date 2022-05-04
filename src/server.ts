import * as Koa from "koa";
import * as Router from "koa-router";
import * as logger from "koa-logger";
import * as bodyParser from "koa-bodyparser";

const PORT = process.env.PORT || 8000;

const app: Koa = new Koa();
const router = new Router();

router.get("/", async (ctx: Koa.Context) => {
  const name = ctx.query.name || "stranger";
  ctx.body = {
    message: `Hello, ${name}!`
  };
});

app
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT, () => console.log(`listening on http://localhost:${PORT}...`));
