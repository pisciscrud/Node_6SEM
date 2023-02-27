const redis = require('redis');
const client = redis.createClient();

client.connect().then(() => console.log('connect'));

client.on('connect', async () => {
    console.log('Test hset: ');
    console.time();
    const arr = Array.from({length: 10000}, (_, i) =>client.hSet('hash', i, `{id:${i}, val:val-${i}}`) );
  
    await Promise.all(arr);
    console.timeEnd();
    console.log('-------------------------------');

    console.log('Test hget: ');
    console.time();
     const arr2 = Array.from({length: 10000}, (_, i) =>client.hGet('hash', `${i}`) );
    await Promise.all(arr2);
    console.timeEnd();
    console.log('-------------------------------');

    await disconnect();
});

client.on('error', (err) => {throw err});

let disconnect = () => client.disconnect().then(() => console.log('disconnect'))