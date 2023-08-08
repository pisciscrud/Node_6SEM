const express = require('express');
const  bodyParser = require("body-parser");
const  fs  =  require ("fs");

const casl =require('casl'); 

const jwt = require("jsonwebtoken");
const {getAllUsers,getUser, getUserByID,getRepos, checkUser, createUser,getRepoByID,addPepo ,changeRepoByID ,deleteRepoByID,getCommitsOfRepo,addCommitToRepo} = require('./DB');
const cookieParser = require("cookie-parser");
const { Ability } = require('@casl/ability');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const UsersRoute = require('./routers/UserRoute');
const AbilityRoute=require('./routers/AbilityRoute');
const ReposRoute=require('./routers/RepoRoute');
const AuthRoute = require('./routers/AuthRoute');
app.use(cookieParser('secret'));

app.use((req,res,next)=>
{
    const { rules, can } = casl.AbilityBuilder.extract();
    const { accessToken } = req.cookies;

    if (accessToken) {
        try {
            const { username, role, id } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            req.authInfo = { username, role, id };
            console.log(req.authInfo)
            if (req.authInfo.role === 'admin') {
                can('manage', 'all');
            }
            else {
                can(['read', 'create', 'update'], ['Repos', 'Commits'], { authorId: req.authInfo.id });
                can('read', 'Users', { id: req.authInfo.id });
            }
        }
        catch (e) {
            delete req.authInfo;
        }
    }
    else {
        req.authInfo = { guest: true };
        can('read', ['Repos', 'Commits'], 'all');
    }
    req.ability = new casl.Ability(rules);
    next();
})




app.use('/auth/',AuthRoute) ;
app.use('/api/users', UsersRoute);
app.use('/api/ability', AbilityRoute);
app.use('/api/repos', ReposRoute);


app.use((req, res, next) => {
    if (req.method !== 'GET'  && req.method !== 'POST' && req.method !== 'PUT' && req.method !=='DELETE')
    {
        res.status(404).send(`Method ${req.method} is not available`);
    }
    else 
    {
    res.status(404).send('Not found');
    }
});


app.listen(4000, () => {
    console.log(`Server started at http://localhost:4000`);
});
