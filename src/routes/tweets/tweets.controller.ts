import * as Koa from "koa";
import * as Router from "koa-router";

import tweetsController from "./search.controller";

// Environment variables
require("dotenv").config();

// Router variables
const routerOpts: Router.IRouterOptions = {
  prefix: "/tweets",
};
const router: Router = new Router(routerOpts);

// End point for retrieving the Tweets
router.get("/", async (ctx: Koa.Context) => {
  ctx.body = "/";
});

router.use(tweetsController.routes());
router.use(tweetsController.allowedMethods());

export default router;
