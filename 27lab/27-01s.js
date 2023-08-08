const { ServerDH } = require('./module/ServerDH');
const fs = require('fs');
const app = require('express')();
const bodyParser = require('body-parser');
const cipherFile = require('./module/EncDecFile').cipherFile;
let serverDH;
let serverSecret;
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res, next) =>
{
    serverDH = new ServerDH(1024, 3);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(serverDH.getContext()));
});

app.get('/resource', (req, res, next) =>
{
    if (serverSecret !== undefined)
    {
        res.statusCode = 200;
        let readStream = fs.createReadStream('./files/encrypted.txt');
        readStream.pipe(res);
        readStream.on('close', () =>
        {
            console.log(readStream.bytesRead);
            res.end();
        });
    }
    else
    {
        res.statusCode = 409;
        res.end('Failure');
    }
});

app.post('/key', (req, res, next) =>
{
    let body = '';
    req.on('data', chunk =>
    {
        body += chunk.toString();
    });
    req.on('end', () =>
    {
        try {
        const clientContext = JSON.parse(body);
        if (clientContext.key_hex !== undefined)
        {
            serverSecret = serverDH.getSecret(clientContext);
      
            res.writeHead(200, {'Content-Type': 'text/plain'});
            const key = new Buffer.alloc(32);
            serverSecret.copy(key, 0, 0, 32);

            const rs = fs.createReadStream('./files/file.txt');
            const ws = fs.createWriteStream('./files/encrypted.txt');
            cipherFile(rs, ws, key);
            res.end('Success');
        }
        else
        {
            res.writeHead(409, {'Content-Type': 'application/json'});
            res.end('Failure');
        }
    }
    catch (e)
    {
        res.writeHead(409, {'Content-Type': 'application/json'});
        res.end('Failure');
    }
    });
});

app.listen(3000, () =>
{
    console.log('localhost:3000');
});