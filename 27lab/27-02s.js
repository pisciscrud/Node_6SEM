const { ServerSign } = require('./module/Sign');
const fs = require('fs');
const app = require('express')();


const bodyParser = require("body-parser");




app.use(bodyParser.json());
app.get("/", (req, res) => {
  try {
    const rs = fs.createReadStream(`${__dirname}/files/client.txt`, {
      encoding: "utf8",
    });
    ServerSign(rs, (signContext) => {
      res.json(signContext);
    });
  } catch (e) {
    res.status(409).json({ error: "Something run wrong" });
  }
});

app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});
