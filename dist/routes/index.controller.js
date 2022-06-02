"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const routerOpts = {};
const router = new Router(routerOpts);
router.get("/", async (ctx) => {
    ctx.body = "Index Page";
});
exports.default = router;
