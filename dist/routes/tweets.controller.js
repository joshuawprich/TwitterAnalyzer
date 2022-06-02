"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const axios_1 = require("axios");
require("dotenv").config();
const token = process.env.TWITTER_BEARER_TOKEN;
const routerOpts = {
    prefix: "/tweets"
};
const baseURL = "https://api.twitter.com/2/tweets/";
const router = new Router(routerOpts);
async function getTweet(tweetID) {
    let url = baseURL + tweetID;
    var config = {
        method: "get",
        url: url,
        headers: {
            Authorization: token
        }
    };
    return await (0, axios_1.default)(config)
        .then(function (response) {
        let data = JSON.stringify(response.data);
        if (response.data.errors) {
            return "error";
        }
        else {
            return data;
        }
    })
        .catch(function (error) {
        console.log(error);
    });
}
//async function getRequest() {}
router.get("/", async (ctx) => {
    console.log(ctx.query)
    let response = await getTweet(ctx.query.tweetID);
    console.log(response);
    ctx.body = response;
});
exports.default = router;
