import { RedisClientType } from '@redis/client';
import * as Redis from 'redis';

export const initRedisClient = () => {
    //const options

    const redisClient: RedisClientType = Redis.createClient();

    redisClient.connect()

    redisClient.on("error", (err) => {
        console.log(err);
    })

    return redisClient;
}