const redis = require('redis');

class RedisClient {
  constructor(config) {
    this.client = redis.createClient({
      url: `redis://${config.user}:${encodeURIComponent(config.password)}@${config.host}:${config.port}/${config.db}`,
    });
    // this.client.connect();
  }

  async push(key, value) {
    let element = Buffer.from(JSON.stringify(value), 'utf8');
    await this.client.connect();
    const count = await this.client.lPush(key, element);
    await this.client.disconnect();
    return count;
  }

  async pop(key) {
    const result = await this.client.lPop(key);
    return result;
  }

  disconnect() {
    this.client.disconnect();
  }
}

module.exports = RedisClient;
