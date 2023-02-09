const  sequelize= require("./db");
const http = require("http");
const collections=require('./model/model').ORM(sequelize);
const GetHandler = require("./handlers/GetHandler");
const PostHandler = require("./handlers/PostHandler");
const PutHandler = require("./handlers/PutHandler");
const DeleteHandler = require("./handlers/DeleteHandler");


sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
}
).catch(err => {
    console.error("Unable to connect to the database:", err);
});

let handler = (params) => {
 
    switch(params.req.method) {
        case "GET":
            GetHandler(params);
            break;
        case "POST":
            PostHandler(params);
            break;
        case "PUT":
            PutHandler(params);
            break;
        case "DELETE":
            DeleteHandler(params);
            break;
    }
}

sequelize.sync().then(result=>{
    console.log(result);
  })
  .catch(err=> console.log(err));

const server = http.createServer((req, res) => {
    handler({req, res, collections});
}).listen(3000, () => {
    console.log("Server running on port 3000");
});


