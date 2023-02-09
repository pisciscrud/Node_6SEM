const redis = require('redis');
const client = redis.createClient();

client.connect().then(() => console.log('connect'));

client.on('connect', async () => {
    console.log('Test set: ');

    console.time();
    for (let i = 0; i < 10000; i++) {
        await client.set(`${i}`, `value:${i}`);
    }
    console.timeEnd();
    console.log('-------------------------------');

    console.log('Test get: ');
    console.time()
    for (let i = 0; i < 10000; i++) {
        //console.log(await client.get(i));
        await client.get(`${i}`);
    }
    console.timeEnd()
    console.log('-------------------------------');

    console.log('Test del: ');
    console.time()
    for (let i = 0; i < 10000; i++) {
        //console.log(await client.get(i));
        await client.del(`${i}`);
    }
    console.timeEnd()
    console.log('-------------------------------');

    await disconnect();
});

client.on('error', (err) => {throw err});

let disconnect = () => client.disconnect().then(() => console.log('disconnect'));