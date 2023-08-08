const express = require('express');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({});
const app = express();


app.use(express.urlencoded({ extended: true }));


app.get('/:id', async (req, res) => {
   const {id}=req.params;

   const user = await  prisma.User_table.findUnique({
    where: {
        id: parseInt(id),
    },
        select : {
          id: true,
         name: true,
        
        }});

    if (!user) {
        return res.status(404).send('Not found');
    }
    else
    {
     res.json(user);
    }
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
    }
);