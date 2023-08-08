const express = require('express')
const { PrismaClient } = require('@prisma/client')
const bodyParser = require("body-parser");

const app = express()
const prisma = new PrismaClient({});
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }));

app.get('/toursoperators/:skip', async (req, res) => {
    const touroperators = await prisma.touroperators.findMany({ skip: +req.params.skip, take: 2 })
    res.json(touroperators)
})

app.listen(3000)