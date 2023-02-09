const redis = require('redis');

const publisher = redis.createClient();
let i = 0;

publisher.connect().then(() => console.log('connected publisher'));
publisher.on('publish', () => console.log('publish'));

setInterval(() => {
    publisher.publish('subscribe_1', `message ${i++}`)
        .then(() => console.log('sent'));
}, 2000);