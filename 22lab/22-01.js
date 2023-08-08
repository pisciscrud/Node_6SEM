const passport = require('passport');
const session = require('express-session');
const app = require('express')();
const { BasicStrategy } = require('passport-http');
const Users = require('./users.json') || [];

passport.use(
  new BasicStrategy((username, password, done) => {
    const user = Users.find((u) => u.username === username && u.password === password);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  })
);

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());



app.get('/login',  (req, res, next) => {
  if (req.session.logout && req.headers.authorization) {
      req.session.logout = false;
      delete req.headers.authorization;
  }
  next();
},  passport.authenticate('basic', {session: false}), (req, res) => {
  res.json(req.user.username);
});

app.get('/logout', (req, res)=>{
  req.session.logout = true;
  res.redirect('/login');
});

app.get('/resource', passport.authenticate('basic', {session: false}), (req, res) => {
  res.send('RESOURCE');
});

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.listen(3000);
