import * as Koa from "koa";
import * as Router from "koa-router";
import * as Natural from "natural"
import *  as Http from "http-status-codes";
import axios from "axios";
import { ResError, Tweet } from "../@types/twitter";

require("dotenv").config();

const token: string = process.env.TWITTER_BEARER_TOKEN;

const routerOpts: Router.IRouterOptions = {
  prefix: "/tweets"
};

const baseURL: string = "https://api.twitter.com/2/tweets";

const router: Router = new Router(routerOpts);

const Analyzer = Natural.SentimentAnalyzer
const stemmer = Natural.PorterStemmer

function analyzeTweet(tweet: Tweet): Tweet {
  var analyzer = new Analyzer("English", stemmer, "afinn")
  var textArray = tweet.text.split(" ")
  var sentiment = analyzer.getSentiment(textArray);
  tweet.sentiment = sentiment;
  return tweet;
}

// Funtion for retrieving the tweet object from
// the Twitter Api given the Tweet ID/s
async function getTweet(tweetID: string|string[]) {

  let url: string;

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

      let data = response.data;

      if (data.errors) {

        let error: ResError = response.data.errors[0]
        return "Error: " + error.detail;
        
      } else {
        // if(data.data.isArray()) {
        //   tweetArray = data.data
        // } else {
        //   tweetArray[0] = data.data
        // }
        let res = data.data
        if(res[0] === undefined) {
          res = analyzeTweet(res)
        } else {
          for(let i = 0; i < res.length; i++) {
            res[i] = analyzeTweet(res[i])
          }
        }
        //let tweet: Tweet = analyzeTweet(res);
        return res;
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
