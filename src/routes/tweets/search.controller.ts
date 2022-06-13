import * as Koa from "koa";
import * as Router from "koa-router";
import * as Natural from "natural";
import * as Http from "http-status-codes";
import axios from "axios";
import { ResError, Tweet } from "../../@types/twitter";
import { RedisClientType } from "@redis/client";

// Environment variables
require("dotenv").config();

// Router variables
const routerOpts: Router.IRouterOptions = {
  prefix: "/search",
};
const router: Router = new Router(routerOpts);

// Redis
var redisClient: RedisClientType;

//Initialise sentiment analysis
const Analyzer = Natural.SentimentAnalyzer;
const stemmer = Natural.PorterStemmer;

// Variables for the request
const token: string = process.env.TWITTER_BEARER_TOKEN;

// Function for analyzing tweet sentiment
function analyzeTweet(tweet: Tweet): Tweet {
  let analyzer = new Analyzer("English", stemmer, "afinn");
  let textArray: string[] = tweet.text.split(" ");
  let sentiment = analyzer.getSentiment(textArray);
  tweet.sentiment = sentiment;

  //Store the tweet in redis
  let key = String(tweet.id);
  let value = JSON.stringify(tweet);

  redisClient.set(key, value);
  return tweet;
}

// Get value from redisCLient based on key
async function queryRedis(key: string) {
  return redisClient.get(key);
}

// Search redis for tweets
async function searchRedis(tweets: string[]) {
  // Instantiate the objects
  let data: any = [];
  let responses = [];
  let fails = [];

  // Loop through the tweets array and check redis for them.
  // If redis does not contain the tweet store the tweet in the
  // fails array and check twitter for them later.
  for (let i = 0; i < tweets.length; i++) {
    let response = await queryRedis(tweets[i]);

    if (response != null) {
      responses.push(JSON.parse(response));
    } else {
      fails.push(tweets[i]);
    }
  }

  data = { responses: responses, fails: fails };

  return data;
}

// Search twitter for tweets
async function hitTwitter(tweets: string[]) {
  let tweetString = "";

  for (let i = 0; i < tweets.length; i++) {
    if (i > 0) tweetString = tweetString + ",";
    tweetString = tweetString + tweets[i];
  }

  let url: string = "https://api.twitter.com/2/tweets?ids=" + tweetString;

  // Request config
  var config = {
    method: "get",
    url: url,
    headers: {
      Authorization: token,
    },
  };

  return await axios(config)
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      return err;
    });
}

async function getTweets(tweets: string[]) {
  // Search Redis
  let data: any = await searchRedis(tweets);
  // Search Twitter
  let response = [];
  if (data.fails.length > 0) response = await hitTwitter(data.fails);

  //Analyze tweets from twitter and store them in redis
  for (let i = 0; i < response.length; i++) {
    let tweet = analyzeTweet(response[i]);
    data.responses.push(tweet);
  }
  return data.responses;
}

// End point for retrieving the Tweets
router.get("/", async (ctx: Koa.Context) => {
  redisClient = ctx.redis;

  let query: string[] = ctx.query.ids.toString().split(",");

  let data = await getTweets(query);

  ctx.body = data;
});

export default router;
