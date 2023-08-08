const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const session = require('express-session')
require('./auth');

const app = express();

app.use(
  session({
    secret: "secret-google-session",
    resave: false,
    saveUninitialized: false,
  })
);



app.use(passport.initialize());
app.use(passport.session());
 


function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}




app.get('/login',  (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google',

  passport.authenticate('google', { scope: [ 'email', 'profile' ], prompt:'select_account' }
));

app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/resource',
    failureRedirect: '/login'
  })
);

app.get('/resource',isLoggedIn,
     (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get('/logout', (req, res) => {

  req.logout(err => {});
  res.redirect('/login');
});

app.listen(9000, () => console.log('listening on port: 9000'));