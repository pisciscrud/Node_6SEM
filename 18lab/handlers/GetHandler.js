
const url = require('url');
const http = require('http');
const fs = require('fs');
const indexPath = './index.html';

const errorHandler = require('./errorHandler');
function methodNotRecognized() {
    errorHandler(res, 0, `Method not recognised :[`);
}

module.exports = ({ res, req, collections }) => {

    let path = decodeURI(url.parse(req.url).pathname);
    pathParameters = path.split('/');
    switch (true) {

        case path == '/': {
            try {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end(fs.readFileSync(indexPath));
            }
            catch (e) {
                errorHandler(res, 1, `Unable to read the file (${indexPath})`);
            }
            break;
        }

        case path == '/api/faculties': {
        collections.Faculty.findAll()
                .then(values => {
                  res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(values))
                })
                .catch(error => { errorHandler(res, 2, error); });
            break;
        }

        case path == '/api/teachers': {
            collections.Teacher.findAll()
                    .then(values => {
                      res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(values))
                    })
                    .catch(error => { errorHandler(res, 2, error); });
                break;
            }


        case path == '/api/pulpits': {
            collections.Pulpit.findAll()
                .then(values => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(values))
                })
                .catch(error => { errorHandler(res, 2, error); });
            break;
        }

        case path == '/api/subjects': {
           collections.Subject.findAll()
                .then(values => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                   res.end(JSON.stringify(values))
                })
                .catch(error => { errorHandler(res, 2, error); });
            break;
        }

        case path == '/api/auditoriumtypes': {
            collections.Auditorium_type.findAll()
                .then(values => {
                  res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(values))
                })
                .catch(error => { errorHandler(res, 2, error); });
            break;
        }

        case path == '/api/auditoriums': {
          collections.Auditorium.findAll()
                .then(values => {
                   res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(values))
                })
                .catch(error => { errorHandler(res, 2, error); });
            break;
        }


        case path == `/api/auditoriumtypes/${pathParameters[3]}/auditoriums`: {
            console.log(pathParameters[3]);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            DB.find([`${pathParameters[3]}`], 'auditorium1').then((result) => {
                if (!result) {
                    throw new Error();

                }
                else {
                    res.end(JSON.stringify(result))
                }
            }).catch(error => { errorHandler(res, 6, `Such type is not found`); });
            break;
        }
        case path == `/api/faculty/${pathParameters[3]}/pulpits`: {
            console.log(pathParameters[3]);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            DB.find([`${pathParameters[3]}`], 'pulpit1').then((result) => {
                if (!result) {
                    throw new Error();
                }
                else {
                    res.end(JSON.stringify(result))
                }
            }).catch(error => { errorHandler(res, 6, `Such faculty is not found`); });
            break;
        }

        default: {
            res.end("API not exist pathname");
            break;
        }
    }
}