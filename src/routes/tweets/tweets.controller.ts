import * as Koa from "koa";
import * as Router from "koa-router";

import searchController from "./search.controller";
import streamController from "./stream.controller";

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

router.use(searchController.routes());
router.use(searchController.allowedMethods());
router.use(streamController.routes());
router.use(streamController.allowedMethods());

export default router;
