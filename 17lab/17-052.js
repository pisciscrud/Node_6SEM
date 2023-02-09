const redis = require('ioredis');

const subscriber = redis.createClient();

subscriber.on('connect', () => console.log('connect'));
subscriber.on('ready', () => console.log('ready'));



subscriber.on('message', (channel, message) =>
{
    console.log(`Received data : + ${message}, channel: ${channel}`);
});

subscriber.subscribe("subscribe_1");