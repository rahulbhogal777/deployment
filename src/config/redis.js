import { createClient } from "redis";

const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on("error", (err) => {
  console.log("Redis client Error: ", err);
  
});
redisClient.on("connect", () => {
  console.log("Redis is connected.");
});

(async () => {
    try {
        await redisClient.connect();
        console.log("Redis is running.");
    } catch (err) {
        console.log(err);
    }
})();


export default redisClient;

