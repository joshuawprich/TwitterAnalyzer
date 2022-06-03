import * as Koa from "koa";
import * as Router from "koa-router";
import *  as Http from "http-status-codes";
import axios from "axios";

require("dotenv").config();

const token:string = process.env.TWITTER_BEARER_TOKEN;

const routerOpts: Router.IRouterOptions = {
  prefix: "/tweets"
};

const baseURL:string = "https://api.twitter.com/2/tweets";

const router:Router = new Router(routerOpts);

// Funtion for retrieving the tweet object from
// the Twitter Api given the Tweet ID/s
async function getTweet(tweetID:string|string[]) {

  let url:string;

  // Check if the given ID string contains more than 1 ID
  if(tweetID.includes(',')) {
    url = baseURL.concat("?ids=")
  } else {
    url = baseURL.concat("/")
  }

  url += tweetID;

  // Request config
  var config = {
    method: "get",
    url: url,
    headers: {
      Authorization: token
    }
  };

  // Async request function
  return await axios(config)
    .then(function (response) {

      let data = JSON.stringify(response.data);

      if (response.data.errors) {

        let error = response.data.errors[0]
        return "Error: " + error.detail;
        
      } else {
        let tweet:string = data
        return tweet;
      }
    })
    .catch(function (error) {
      let errorMessage:string[] = error.response.data 
      return errorMessage;
    });
}

// End point for retrieving the Tweets
router.get("/", async (ctx: Koa.Context) => {

  let query:string|string[] = ctx.query.ids

  let response = await getTweet(query);

  ctx.body = response;
});

export default router;
