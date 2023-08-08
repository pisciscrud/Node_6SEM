const https = require("https")
const fs = require("fs")
const express = require('express')
const app = express()


const key = fs.readFileSync('./encryption/MY.key');
const cert = fs.readFileSync('./encryption/MY.crt');

const options = {
    key: key,
    cert: cert
};
app.get('/', (req, res) =>
{

    res.send("https Stalmakhova")
})

https.createServer(options, app).listen({
    port: 3000
}, () => console.log("run"))