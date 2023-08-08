const express = require('express');
const { PrismaClient } = require('@prisma/client')
const bodyParser = require("body-parser");
const fs = require('fs');

const app = express();

const prisma = new PrismaClient({});
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

app.get('/toursoperators', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 2;
    const totalTouroperators = await prisma.touroperators.count();
    const totalPages = Math.ceil(totalTouroperators/ pageSize);
  
    const prevPage = page === 1 ? 1 : page - 1;
    const nextPage = page === totalPages ? totalPages : page + 1;
  
    const offset = (page - 1) * pageSize;
    const touroperators = await prisma.touroperators.findMany(
        {
        skip: offset,
        take: pageSize 
         });

         let html = `
         <h1>Операторы</h1>
         <ul class="departments">
       `;
   
       touroperators.forEach((touroperator) => {
         html += `<li>${touroperator.name} ${touroperator.phonenumber}</li>`;
       });
   
       html += "</ul>";
   
       html += `<div class="pagination">
         <a href="/toursoperators?page=${prevPage}">Previous</a>
         <span>Page ${page} of ${totalPages}</span>
         <a href="/toursoperators?page=${nextPage}">Next</a>
       </div>`;
   
       res.send(html);
})

app.listen(3000)
