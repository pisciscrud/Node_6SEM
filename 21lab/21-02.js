const passport = require('passport');

const app = require("express")();
const {DigestStrategy} = require("passport-http");
let Users =  require("./users.json")

const credentials = (user) => {
    return Users.find(e => e.user.toUpperCase() === user.toUpperCase());
}
const session = require("express-session")(
    {
        resave: false,
        saveUninitialized: false,
        secret: "~#secret#~"
    }
);

passport.use(new DigestStrategy({qop: "auth"},(user, done)=>{
    let rc = null;
    let cr = credentials(user);
    if(!cr) rc = done(null, false);
    else rc  = done(null, cr.user, cr.password);
    return rc;
},(params, done) => {
    console.log("params = ", params);
    done(null, true);
}))

passport.serializeUser((user, done)=> {
    console.log("serialize", user);
    done(null, user);
})

passport.deserializeUser((user, done) => {
    console.log("deserialize", user);
    done(null, user);
})

app.use(session);
app.use(passport.initialize(null));
app.use(passport.session(null));

app.get('/login', (req, res, next)=>
    {
        console.log('Login')
        if (req.session.logout && req.headers['authorization'])
        {
            req.session.logout = false;
            delete req.headers['authorization'];
        }
        next();
    },passport.authenticate('digest', {session: false}),
    (req, res) => {
        res.json(req.user);
    });

app.get('/logout', (req, res) =>
{
    req.session.logout = true;
    delete req.headers['authorization'];
    res.redirect('/login');
})

app.get('/resource', (req, res)=>
{
    if(req.session.logout === false && req.headers['authorization'])
        res.end('RESOURCE');
    else
        res.redirect('/login')
});

app.use( (req, res, next) => {
    res.status(404).send("Not Found")
  });

app.listen(3000);