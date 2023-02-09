const redis = require('redis');
const client = redis.createClient();

client.connect().then(() => console.log('connect'));

client.on('connect', async () => {
    console.log('Test incr: ');

    await client.set('incr',0);
    console.time();
    for (let i = 0; i < 10000; i++) {
        await client.incr('incr')
            //.then((r) => console.log(r));
    }
    console.timeEnd();
    console.log('-------------------------------');

    console.log('Test decr: ');

    await client.set('decr', 10000);
    console.time();
    for (let i = 0; i < 10000; i++) {
        await client.decr('decr')
        //.then((r) => console.log(r));
    }
    console.timeEnd();
    console.log('-------------------------------');
    await client.del('incr')
    await client.del('decr')
    await disconnect();
});

client.on('error', (err) => {throw err});

let disconnect = () => client.disconnect().then(() => console.log('disconnect'));