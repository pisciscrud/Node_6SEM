const passport = require('passport');

const app = require("express")();
const {BasicStrategy} = require("passport-http");
let Users =  require("./users.json")

const session = require("express-session")(
    {
        resave: false,
        saveUninitialized: false,
        secret: "~#secret#~"
    }
);

const credentials = (user) => {
    return Users.find(e => e.user.toUpperCase() === user.toUpperCase());
}

const verification = (pass1, pass2) => {
    return pass1 === pass2
};

passport.use(new BasicStrategy((user, password, done)=>{
    console.log("passport.use", user, password);
    let rc = null;
    let cr = credentials(user);

    if(!credentials(user)) rc = done(null, false, {message: "incorrect login"});
    else if(!verification(cr.password, password)) rc = done(null, false, {message: "incorrect password"})
    else rc  = done(null, user);
    return rc;
}));



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

app.get('/login',(req, res, next) =>
    {
        if (req.session.logout && req.headers['authorization'])
        {
            req.session.logout = false;
            delete req.headers['authorization'];
        }
        next();
    },
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        res.json(req.user);
    });

app.get('/logout', (req, res)=>
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