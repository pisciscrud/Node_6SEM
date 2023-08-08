const express = require("express");

const hbs = require("hbs");
const expressHbs = require("express-handlebars").create({ extname: ".hbs" });
const fs = require("fs");
const bodyParser = require("body-parser");

const taskRouter = require("./routers/TaskRouter.js");
const employeeRouter = require("./routers/EmployeeRouter.js");
const departmentRouter = require("./routers/DepartmentRouter");



const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine(".hbs", expressHbs.engine);
app.set("view engine", ".hbs");

app.use("/task", taskRouter);
app.use("/employee", employeeRouter);
app.use("/depart",departmentRouter);


app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
