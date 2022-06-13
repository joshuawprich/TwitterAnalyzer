import * as Koa from "koa";
import * as Router from "koa-router";

const routerOpts: Router.IRouterOptions = {
    prefix: "/stream",
  };
const router: Router = new Router(routerOpts);

// End point for retrieving the Tweets
router.get("/", async (ctx: Koa.Context) => {
  ctx.body = "stream"
});
  
export default router;