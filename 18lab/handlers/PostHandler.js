const url = require('url');
const http = require('http');
const fs = require('fs');

const errorHandler = require('./errorHandler');

module.exports = ({ res, req, collections }) => {
    let path = decodeURI(url.parse(req.url).pathname);
    let jsonData = '';

    switch (true) {
        case path == '/api/faculties': {
            req.on('data', data => {
                body = JSON.parse(data);

                collections.Faculty.create({ faculty: body.FACULTY, faculty_name: body.FACULTY_NAME })
                    .then(result => {
                        console.log(result)
                        res.end(JSON.stringify(body));
                    })
                    .catch(error => { errorHandler(res, 7, 'Such faculty is in database'); });
            })
            break;
        }

        case path == '/api/tasks': {
            req.on('data', data => {
                body = JSON.parse(data);
                console.log(body);
                collections.Tasks.create({ Name: body.Name, Description: body.Description, DepartmentID: body.DepartmentID, EmployeeID: body.EmployeeID, Status: body.Status, Deadline: body.Deadline })
                    .then(result => {
                        console.log(result)
                        res.end(JSON.stringify(body));
                    })
                    .catch(error => { errorHandler(res, 7, 'Such task is in database'); });
            })
            break;
        }

        case path == '/api/subjects': {
            req.on('data', data => {
                body = JSON.parse(data);

                collections.Subject.create({ subject: body.SUBJECT, subject_name: body.SUBJECT_NAME, pulpit: body.PULPIT })
                    .then(result => {
                        console.log(result)
                        res.end(JSON.stringify(body));
                    })
                    .catch(error => { errorHandler(res, 7, 'Such subject is in database'); });
            })
            break;
        }

        case path == '/api/auditoriumtypes': {
            req.on('data', data => {
                body = JSON.parse(data);

                collections.Auditorium_type.create({ auditorium_type: body.AUDITORIUM_TYPE, auditorium_typename: body.AUDITORIUM_TYPENAME })
                    .then(result => {
                        console.log(result)
                        res.end(JSON.stringify(body));
                    })
                    .catch(error => { errorHandler(res, 7, 'Such auditorium type is in database'); });
            })
            break;
        }

        case path == '/api/auditoriums': {
            req.on('data', data => {
                body = JSON.parse(data);

                collections.Auditorium.create({ auditorium: body.AUDITORIUM, auditorium_name: body.AUDITORIUM_NAME, auditorium_capacity: body.AUDITORIUM_CAPACITY, auditorium_type: body.AUDITORIUM_TYPE })
                    .then(result => {
                        console.log(result)
                        res.end(JSON.stringify(body));
                    })
                    .catch(error => { errorHandler(res, 7, 'Such auditorium  is in database'); });
            })
            break;
        }


        case path == '/api/teachers': {
            req.on('data', data => {
                body = JSON.parse(data);
                console.log(body);
                collections.Teacher.create({ teacher: body.teacher, teacher_name: body.teacher_name, pulpit: body.pulpit })
                    .then(result => {
                        console.log(result)
                        res.end(JSON.stringify(body));
                    })
                    .catch(error => { errorHandler(res, 7, 'Such teacher  is in database'); });
            })
            break;
        }

        default: {
            res.end("API not exist pathname");
            break;
        }
    }
}
