const express = require('express');
const {DigestStrategy} = require('passport-http');
const Users = require('./users');
const session = require('express-session');
const passport = require("passport");
const app = express();


passport.use('digest',new DigestStrategy(
    {qop: 'auth'},
    (username, done) => {
        const user =Users.find(u => u.username === username  );
     
        if (user) {
            
            return done(null, user, user.password);
        } else {
            return done(null, false);
        }
    }
));



app.use(passport.initialize({}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
passport.serializeUser((user, done) => {
    done(null, user.username);
  });
  
  passport.deserializeUser((username, done) => {
    const user = Users.find((u) => u.username === username);
    done(null, user);
  });

app.get('/login',
    (req, res, next) => {


        if (req.session.logout && req.headers.authorization) {
            req.session.logout = false;
            delete req.headers.authorization;
        }
        next();
    }, passport.authenticate('digest', {session: true}),
    (req,res)=>
    {
        res.json(req.user.username)
    },
);



app.get('/logout', (req, res) => {
    req.session.logout = true;
    res.redirect('/login');
});

app.get('/resource',
    passport.authenticate('digest', {session: true}),
    (req, res) => {
        res.send('RESOURCE');
    }
);

app.use((req, res) => {
    res.status(404).send('Not found');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});