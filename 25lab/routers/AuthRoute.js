const express =require('express') ;
const AuthRoute = express.Router();
const  bodyParser = require("body-parser");
const  fs  =  require ("fs");

const casl =require('casl'); 

const jwt = require("jsonwebtoken");
const {getAllUsers,getUser, getUserByID,getRepos, checkUser, createUser,getRepoByID,addPepo ,changeRepoByID ,deleteRepoByID,getCommitsOfRepo,addCommitToRepo} = require('../DB');
const cookieParser = require("cookie-parser");



AuthRoute .get('/register', (req, res) => {
    const rs = fs.createReadStream('register.html');
    rs.pipe(res);
});


AuthRoute.post('/register', async (req, res) => {
    const { username, password, role,email } = req.body;

   const userFromBd = await checkUser(username, password)

    if (!userFromBd) {
        await createUser(username, password,role,email);
        res.redirect('/auth/login');
    }

    else {
        res.status(400).json({ message: "User already exists" });
    }
});

AuthRoute.get('/login', (req, res) => {
   
    const rs = fs.createReadStream('login.html');
    rs.pipe(res);
});



AuthRoute.post('/login', async  (req, res) => {
    const { username, password } = req.body;
    const user = await checkUser(username, password)
    console.log(user)
    if (user) {
   
       
        const accessToken = jwt.sign({id: user.id ,username:user.username,role:user.role},  process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
        res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: "strict", });   
        res.redirect('/auth/resource');
    }

    else {

        res.redirect('/auth/login');
    }
});


AuthRoute.get('/resource', async  (req, res, next) => {
    const { accessToken} = req.cookies;
   
     if ( !accessToken) 
     {
        return res.status(401).json({ message: "Unauthorithed" });
     }
    else {
        try {
            console.log('ssss')
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const { id } = decoded;
        const user = await getUserByID(id);
        res.json('resource for '+ user.username)
        }
        catch (err) {
            if (err instanceof jwt.JsonWebTokenError) {
              return res.status(401).json({ message: 'Invalid token' });
            }

    }
}
});

    
  

AuthRoute.get('/logout', async (req, res) => {
    res.clearCookie('accessToken');
    res.redirect('/auth/login');
});

module.exports = AuthRoute