const express = require("express");
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.js");
const DB = require("./db");

const app = express();

app.use(bodyParser.json());
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get("/ts", (req, res) => {
  res.json(DB.GetAll());
});

app.post("/ts", (req, res) => {
  if (DB.Add(req.body)) {
    res.json({ message: "Added" });
  } else {
    res.status(400).json({ message: "Invalid parameters" });
  }
});

app.put("/ts", async (req, res) => {
  if (DB.Update(req.body)) {
    res.json({ message: "Updated" });
  } else {
    res.status(400).json({ message: "Invalid parameters" });
  }
});

app.delete("/ts", (req, res) => {
  if (DB.Delete(req.query.name)) {
    res.json({ message: "Deleted" });
  } else {
    res.status(400).json({ message: "Invalid parameters" });
  }
});

app.listen(3000, () => {
  console.log(`http://localhost:3000/swagger`);
});
