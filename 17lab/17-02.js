const redis = require('redis');
const client = redis.createClient();

client.connect().then(() => console.log('connect'));

client.on('connect', async () => {

    
    console.log('Test set: ');
   

    console.time();
    const arr = Array.from({length: 10000}, (_, i) =>client.set(`${i}`, `value:${i}`) );
    await Promise.all(arr);
    console.timeEnd();

    console.log('-------------------------------');

    console.log('Test get: ');
    console.time();
    const arr2= Array.from({length: 10000}, (_, i) =>client.get(`${i}`) );
    await Promise.all(arr2);
    console.timeEnd()
    console.log('-------------------------------');


    console.log('Test del: ');
    console.time()
    const arr3= Array.from({length: 10000}, (_, i) =>client.del(`${i}`) );

    await Promise.all(arr3);
    console.timeEnd()
    console.log('-------------------------------');

    await disconnect();
});


client.on('error', (err) => {throw err});

let disconnect = () => client.disconnect().then(() => console.log('disconnect'));