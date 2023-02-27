const redis = require('redis');
const client = redis.createClient();

client.connect().then(() => console.log('connect'));

client.on('connect', async () => {
    console.log('Test incr: ');
     
    await client.set('incr',0);

    console.time();
    const arr = Array.from({length: 10000}, (_, i) =>client.incr('incr') );
    await Promise.all(arr);
    console.timeEnd();

    console.log('-------------------------------');

    console.log('Test decr: ');
    console.time();
    await client.set('decr', 10000);
    const arr2 = Array.from({length: 10000}, (_, i) =>client.decr('decr') );    
    await Promise.all(arr2);
    console.timeEnd();

    console.log('-------------------------------');
    
    await client.del('incr')
    await client.del('decr')
    await disconnect();
});

client.on('error', (err) => {throw err});

let disconnect = () => client.disconnect().then(() => console.log('disconnect'));