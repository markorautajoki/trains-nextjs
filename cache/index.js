import { promisify } from 'util';
import { createClient } from 'redis';

const redisClient = createClient({
  host: process.env.REDIS_HOST,
  port: 6379,
});

redisClient.on('error', (err) => console.log(`Error: ${err}`));

const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

export const setCacheItem = async (key, item) => {
  try {
    await setAsync(key, JSON.stringify(item));
  } catch (err) {
    console.log(err);
  }
};

export const getCacheItem = async (key) => {
  try {
    const item = await getAsync(key);
    return JSON.parse(item);
  } catch (err) {
    console.log(err);
  }
};
