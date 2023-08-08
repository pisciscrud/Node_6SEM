const express = require('express');
const session = require('express-session');

const MySecret = '123';

const app = express();

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: MySecret
}));

app.use((req, res, next) => {
    if (req.session.creationTime !== undefined) {
        let curTime = BigInt(Date.now());
        let delta = curTime - BigInt(req.session.creationTime);
        console.log(delta);
        if (delta > 5000) {
            req.session.destroy();
            res.status(500).json({
                error: 'Session expired'
            });
            return;
        }
    }
    next();
});

app.get('/', (req, res) => {
    let miaut = req.session.creationTime;
    if ((miaut)) {
        console.log('old: ', miaut);
    }
    req.session.creationTime = BigInt(Date.now()).toString();
    console.log('new: ', req.session.creationTime, '\n');
    res.status(200).json({
        messge: 'Ok'
    });
});

app.listen(3000, () => console.log('listening on port 3000'));
