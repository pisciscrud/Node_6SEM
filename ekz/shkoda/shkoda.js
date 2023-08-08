const express = require('express');
const { PrismaClient } = require('@prisma/client')
const bodyParser = require("body-parser");
const fs = require('fs');

const app = express();

const prisma = new PrismaClient({});
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));


app.listen(3000)
