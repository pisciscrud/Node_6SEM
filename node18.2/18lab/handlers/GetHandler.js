const url = require("url");
const http = require("http");
const fs = require("fs");
const indexPath = "./index.html";

const errorHandler = require("./errorHandler");


module.exports = ({ res, req, collections }) => {
  let path = decodeURI(url.parse(req.url).pathname);

  pathParameters = path.split("/");
  switch (true) {
    case path == "/": {
      try {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(fs.readFileSync(indexPath));
      } catch (e) {
        errorHandler(res, 1, `Unable to read the file (${indexPath})`);
      }
      break;
    }

    case path == "/api/faculties": {
      collections.Faculty.findAll()
        .then((values) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(values));
        })
        .catch((error) => {
          errorHandler(res, 2, error);
        });
      break;
    }

    case path == "/api/teachers": {
      collections.Teacher.findAll()
        .then((values) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(values));
        })
        .catch((error) => {
          errorHandler(res, 2, error);
        });
      break;
    }

    case path == "/api/pulpits": {
      collections.Pulpit.findAll()
        .then((values) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(values));
        })
        .catch((error) => {
          errorHandler(res, 2, error);
        });
      break;
    }

    case path == "/api/subjects": {
      collections.Subject.findAll()
        .then((values) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(values));
        })
        .catch((error) => {
          errorHandler(res, 2, error);
        });
      break;
    }

    case path == "/api/auditoriumtypes": {
      collections.Auditorium_type.findAll()
        .then((values) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(values));
        })
        .catch((error) => {
          errorHandler(res, 2, error);
        });
      break;
    }

    case path == "/api/auditoriums": {
      collections.Auditorium.findAll()
        .then((values) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(values));
        })
        .catch((error) => {
          errorHandler(res, 2, error);
        });
      break;
    }

    case path == "/api/auditoriumsgt60": {
      collections.Auditorium.scope("auditoriumsgt60")
        .findAll()
        .then((values) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(values));
        })
        .catch((error) => {
          errorHandler(res, 2, error);
        });

  
    }
    break;

    case path == `/api/auditoriumtypes/${pathParameters[3]}/auditoriums`:
      {
        console.log(pathParameters[3]);
        collections.Auditorium.findAll({
          where: {
            auditorium_type: pathParameters[3],
          },
        })
          .then((values) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(values));
          })
          .catch((error) => {
            errorHandler(res, 2, error);
          });
      }

      break;

    case path == `/api/faculty/${pathParameters[3]}/subjects`:
      {
        console.log(pathParameters[3]);
        collections.Faculty.hasMany(collections.Pulpit, {
          foreignKey: "faculty",
          sourceKey: "faculty",
        });
        collections.Pulpit.hasMany(collections.Subject, {
          foreignKey: "pulpit",
          sourceKey: "pulpit",
        });

        collections.Faculty.findAll({
          where: { faculty: pathParameters[3] },
          include: [
            {
              model: collections.Pulpit,
              attributes: ["pulpit_name"],
              required: true,
              include: [
                {
                  model: collections.Subject,
                  required: true,
                },
              ],
            },
          ],
        })
          .then((values) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(values));
          })
          .catch((error) => {
            errorHandler(res, 2, error);
          });
      }
      break;

    default: {
      res.end("API not exist pathname");
      break;
    }
  }
};
