const express =require('express') ;
const UserRoute = express.Router();
const {getAllUsers,getUser, getUserByID,getRepos, checkUser, createUser,getRepoByID,addPepo ,changeRepoByID ,deleteRepoByID,getCommitsOfRepo,addCommitToRepo} = require('../DB');
UserRoute.get('/',async (req,res,next)=>
{

    if(req.ability?.can('manage','all')){
    try 
    {
        
        const users = await getAllUsers();
         res.json(users);
        
    }
    catch (err) {
        res.status(500).json(err);
    }
}
else 
{
    res.status(403).json('Access deniend')
}

})

UserRoute.get('/:id',async (req,res,next)=>
{

    if (req.ability?.can('read', 'Users',{id:req.authInfo.id}))
    {
    try
    {
    const {id} = req.params;
    const user = await getUserByID(id);
    if(!user)
    {
        return res.status(404).json('Not Found')
    }
    if (!(user.id === req.authInfo.id))
    {
            return  res.status(403).json('Access deniend')
    }

    res.status(200).json(user);
    
    }
        catch (err) {
			res.status(500).json(err);
		}
    }
    else
    {
        res.status(403).json('Access deniend')
    }

})
  
module.exports =UserRoute


