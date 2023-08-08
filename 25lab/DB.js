const { PrismaClient } = require( '@prisma/client');
const prisma = new PrismaClient();

const  getAllUsers = async ()=>{

 const users =   await prisma.users.findMany(
        { select :
         {
             username:true,
             email:true,
             role:true,
         }
     }
     );
     return users;
}
 

 const checkUser = async (login, password) => {

 return  await prisma.users.findFirst({
        where : {
            username: login,
            password: password

        }
    });
//     // console.log(user)
}

const getUserByID = async (id) => {
    try {
    const user =  await prisma.users.findFirst({
        where : {
           id: Number(id)
    

        },
        select: 
        {
            id:true,
            username:true,
            email:true,
            role:true,
            
        }
    })
    return user
}
catch(e)
{
    console.log(e);
}
};


const getRepos = async () => {
    const repos =  await prisma.repos.findMany( )
    return repos
};


const getRepoByID = async (id, authorId) => {

    const rep =  await prisma.repos.findFirst(
        {
          where :
          {
            id:Number(id),
            authorId:Number(authorId)
          }
        }
    )
    return rep
};

const getRepoByOnlyID = async (id)=>
{
    const rep =  await prisma.repos.findFirst(
        {
          where :
          {
            id:Number(id),

          }
        }
    )
    return rep
}

const addPepo = async (authorId,name)=>
{
    try {
    const rep =  await prisma.repos.create(
        {
          data:
          {
         name:  name,
         authorId: Number(authorId)
          }
        }
    )

    return rep
    }
    catch (e)
    {
        console.log(e);
    }
}

const changeRepoByID = async (id,name) => {
    try {
    const rep =  await prisma.repos.update(
        {
          where :
          {
            id:Number(id)
          },
          data: {
            name: name
          }
        }
    )
    return rep
    }
    catch (e)
    {
        console.log(e);
    }
};

const deleteRepoByID = async (id) => {
    const rep =  await prisma.repos.delete(
        {
          where :
          {
            id:Number(id)
          }
        }
    )
    return rep
};



const getCommitsOfRepo = async(id) =>
{

    try {
    const commits = await prisma.commits.findMany(
        {
            where: {
                repoId:Number(id)
            },
          
        }
    )
    return commits;
    }
    catch(e) {
        console.log(e);

    }
}

const getCommitById = async(id) =>
{
    
    const commit = await prisma.commits.findUnigue(
        {
            where: {
                id:Number(id)
            },
          
        }
    )
    return commit;

}

const getCommitOfRepo = async(id) =>
{
    const commits = await prisma.repos.findUnique(
        {
            where: {
                id:id
            },
            include :
            {
                commits: true
            }
        }
    )
    return commits;
}



const getCommitsByIdOfRepo = async(id) =>
{
    const commit = await prisma.commits.findUnique(
        {
            where: {
                id:id
            }
        }
    )
    return commit;
}

const addCommitToRepo = async (id, message) =>
{
    try
    {
    const commit = await prisma.commits.create(
        {
           
            data :
            {
                 message:message,
                 repoId: Number(id)
            }
        }
    )
    return commit
    }
    catch(e)
    {
        console.log(e);
    }

}


const updateInfoAboutCommit = async (commitId,name) =>
{
    const commit = await prisma.commits.update(
        {
            where:
            {
                id:Number(commitId)
            },
           
            data :
            {
                message: name,
              
            }
        }
    )
    return commit 
}


const deleteCommit = async( id)=>
{
    const commit = await prisma.commits.delete(
        {
            where: 
            {
                id:Number(id)
            }
        }
    )
    return commit 
}





 const createUser = async (login, password,role,email) => {
  
   const user = await prisma.users.create(
    {
        data:
        {
            username:login,
            password:password,
            role:role,
            email:email
        }
    }
   )


};

const getUser = async (login) =>
{
    return await prisma.users.findFirst({
          where :
          {
              username:login
          }
        }
    )
}

 module.exports={getAllUsers,
    getRepoByOnlyID,
    checkUser,
    getUserByID,
    getRepos,
    getUser,
    createUser,
    changeRepoByID,
    addPepo,
    addCommitToRepo,
    deleteRepoByID,
    getCommitsOfRepo,
    getCommitById ,
    updateInfoAboutCommit,
    deleteCommit,
    getRepoByID

}