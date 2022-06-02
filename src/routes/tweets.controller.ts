import * as Koa from "koa";
import * as Router from "koa-router";
import axios from "axios";
import HttpStatus from "http-status-codes";

require("dotenv").config();

const token: string = process.env.TWITTER_BEARER_TOKEN;

const routerOpts: Router.IRouterOptions = {
  prefix: "/tweets"
};

const baseURL: string = "https://api.twitter.com/2/tweets/";

const router: Router = new Router(routerOpts);

async function getTweet(tweetID: string | string[]) {
  let url: string = baseURL + tweetID;

  console.log(tweetID)

  var config = {
    method: "get",
    url: url,
    headers: {
      Authorization: token
    }
  };

  return await axios(config)
    .then(function (response) {
      let data = JSON.stringify(response.data);
      if (response.data.errors) {

        let error = response.data.errors[0]
        return "Error: " + error.detail;
        
      } else {
        return data;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

//async function getRequest() {}

router.get("/", async (ctx: Koa.Context) => {
  let response = await getTweet(ctx.query.tweetID);

  console.log(response);
  ctx.body = response;
});

export default router;
