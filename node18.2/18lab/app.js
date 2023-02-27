const sequelize = require("./db");
const http = require("http");
const collections = require("./model/model").ORM(sequelize);
const GetHandler = require("./handlers/GetHandler");
const PostHandler = require("./handlers/PostHandler");
const PutHandler = require("./handlers/PutHandler");
const DeleteHandler = require("./handlers/DeleteHandler");
const Sequelize = require("sequelize");

async function TransactionTest() {
  const transaction = await sequelize.transaction({
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
  });
  try {
    const auditoriums = await collections.Auditorium.update(
      { auditorium_capacity: 0 },
      {
        where: { auditorium_capacity: { [Sequelize.Op.gte]: 0 } },
        transaction: transaction,
      }
    );
    console.log(
      await collections.Auditorium.findAll({
        transaction: transaction,
        attributes: ["auditorium_capacity"],
      })
    );
    setTimeout(async () => {
      await transaction.rollback();
      console.log(
        await collections.Auditorium.findAll({
          attributes: ["auditorium_capacity"],
        })
      );
    }, 10000);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

sequelize
  .authenticate()
  .then(console.log("Connection has been established successfully."))
  .then(TransactionTest())
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

let handler = (params) => {
  switch (params.req.method) {
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
};

sequelize
  .sync()
  .then((result) => {
    //console.log(result);
  })
  .catch((err) => console.log(err));

const server = http
  .createServer((req, res) => {
    handler({ req, res, collections });
  })
  .listen(3000, () => {
    console.log("Server running on port 3000");
  });
