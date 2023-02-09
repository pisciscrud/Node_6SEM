const redis = require('redis');
const client = redis.createClient();

client.connect().then(() => console.log('connect'));

client.on('connect', async () => {
    console.log('Test hset: ');

    console.time();
    for (let i = 0; i < 10000; i++) {
        await client.hSet('hash', i, `{id:${i}, val:val-${i}}`)
    }
    console.timeEnd();
    console.log('-------------------------------');

    console.log('Test hget: ');

    console.time();
    for (let i = 0; i < 10000; i++) {
        await client.hGet('hash', `${i}`)
            //.then(result => console.log(result))
    }
    console.timeEnd();
    console.log('-------------------------------');

    await disconnect();
});

client.on('error', (err) => {throw err});

let disconnect = () => client.disconnect().then(() => console.log('disconnect'))