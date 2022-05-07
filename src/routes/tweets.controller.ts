import * as Koa from "koa";
import * as Router from "koa-router";
import axios from "axios";

require("dotenv").config();

const token = `Bearer ${process.env.TWITTER_BEARER_TOKEN}`;

const routerOpts: Router.IRouterOptions = {
  prefix: "/tweets"
};

const url = "https://api.twitter.com/2/tweets/1228393702244134912";

const router: Router = new Router(routerOpts);

var config = {
  method: "get",
  url: url,
  headers: {
    Authorization: token
  }
};

//async function getRequest() {}

router.get("/", async (ctx: Koa.Context) => {
  let d = await axios(config)
    .then(function (response) {
      let data = JSON.stringify(response.data);
      console.log(data);
      return data;
    })
    .catch(function (error) {
      console.log(error);
    });

  ctx.body = d;
});

export default router;
