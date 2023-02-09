const url = require('url');
const http = require('http');
const fs = require('fs');

const errorHandler = require('./errorHandler');

module.exports = ({ res, req, collections }) => {

    let path = decodeURI(url.parse(req.url).pathname);
    pathParameters = path.split('/');
    let jsonData = '';

    switch ('/api/' + pathParameters[2]) {
        case '/api/faculties': {
            req.on('data', data => {
                body = JSON.parse(data);
                collections.Faculty.update(
                    { faculty_name: body.FACULTY_NAME },
                    { where: { faculty: body.FACULTY } }
                )
                    .then((affectedRows) => {
                        console.log(affectedRows);
                        if (affectedRows[0] === 0) {
                            throw new Error('Something wrong with update');
                        }
                        else {
                            res.end(JSON.stringify(body));
                        }
                    })
                    .catch(error => { errorHandler(res, 31, error); });

            })
            break;

        }
        case '/api/pulpits': {
            req.on('data', data => {
                body = JSON.parse(data);
                collections.Pulpit.update(
                    {
                        pulpit_name: body.PULPIT_NAME,
                        faculty: body.FACULTY
                    },
                    { where: { pulpit: body.PULPIT } }
                )

                    .then((affectedRows) => {
                        console.log(affectedRows);
                        if (affectedRows[0] === 0) {
                            throw new Error('Something wrong with update');
                        }
                        else {
                            res.end(JSON.stringify(body));
                        }
                    })
                    .catch(error => { errorHandler(res, 31, error); });
            });
            break;
        }
        case '/api/subjects': {
            req.on('data', data => {
                body = JSON.parse(data);
                collections.Subject.update(
                    {
                        subject_name: body.SUBJECT_NAME,
                        pulpit: body.PULPIT
                    },
                    { where: { subject: body.SUBJECT } }
                )


                    .then((affectedRows) => {
                        console.log(affectedRows);
                        if (affectedRows[0] === 0) {
                            throw new Error('Something wrong with update');
                        }
                        else {
                            res.end(JSON.stringify(body));
                        }
                    })
                    .catch(error => { errorHandler(res, 31, error); });
            });
            break;
        }
        case '/api/teachers': {
            req.on('data', data => {
                body = JSON.parse(data);
                collections.Teacher.update(
                    {
                        teacher_name: body.teacher_name,
                        pulpit: body.pulpit
                    },
                    { where: { teacher: body.teacher} }
                )

                    .then((affectedRows) => {
                        console.log(affectedRows);
                        if (affectedRows[0] === 0) {
                            throw new Error('Something wrong with update');
                        }
                        else {
                            res.end(JSON.stringify(body));
                        }
                    })
                    .catch(error => { errorHandler(res, 31, error); });
            });
        }

            break;

            case '/api/auditoriums': {
                req.on('data', data => {
                    body = JSON.parse(data);
                    collections.Auditorium.update(
                        {
                            auditorium_name: body.AUDITORIUM_NAME,
                            auditorium_type: body.AUDITORIUM_TYPE,
                            auditorium_capacity: body.AUDITORIUM_CAPACITY
                        },
                        { where: { auditorium: body.AUDITORIUM } }
                    )
                    .then ((affectedRows) => {
                        console.log(affectedRows);
                        if (affectedRows[0] === 0) {
                            throw new Error('Something wrong with update');
                        }
                        else {
                            res.end(JSON.stringify(body));
                        }
                    })
                    .catch(error => { errorHandler(res, 31, error); });
                });
            }
            break;

        case '/api/auditoriumtypes': {
            req.on('data', data => {
                body = JSON.parse(data);
                collections.Auditorium_type.update(
                    {
                        auditorium_typename: body.AUDITORIUM_TYPENAME
                    },
                    { where: { auditorium_type: body.AUDITORIUM_TYPE } }
                )
                    
                    .then((affectedRows) => {
                        console.log(affectedRows);
                        if (affectedRows[0] === 0) {
                            throw new Error('Something wrong with update');
                        }
                        else {
                            res.end(JSON.stringify(body));
                        }
                    })
                    .catch(error => { errorHandler(res, 31, error); });
            });
        }
        break;

        default: {

            res.end("API not exist pathname");
            break;
        }
    }
}