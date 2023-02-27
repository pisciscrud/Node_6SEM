const url = require('url');
const http = require('http');
const fs = require('fs');

const errorHandler = require('./errorHandler');

module.exports = ({ res, req, collections }) => {


    let path = decodeURI(url.parse(req.url).pathname);
    pathParameters = path.split('/');
    let jsonData = '';
    const successResponse = { message: 'Successufully deleted' };
    switch ('/api/' + pathParameters[2]) {

        case '/api/faculties': {
            collections.Faculty.destroy(
                { where: { faculty: pathParameters[3] } }
            )
                .then(result => {
                    if (result == 1) {
                        res.end(JSON.stringify('Successufully deleted'));
                    }
                    else {
                        throw new Error('Faculty not found');
                    }
                })
                .catch(error => { errorHandler(res, 31, error); });
            break;
        }

        case '/api/pulpits': {
            collections.Pulpit.destroy(
                { where: { pulpit: pathParameters[3] } }
            )
                .then(result => {
                    if (result == 1) {
                        res.end(JSON.stringify('Successufully deleted'));
                    }
                    else {
                        throw new Error('Pulpit not found');
                    }
                })
                .catch(error => { errorHandler(res, 31, error); });
            break;
        }

        case '/api/subjects': {
            collections.Subject.destroy(
                { where: { subject: pathParameters[3] } }
            )
                .then(result => {
                    if (result == 1) {
                        res.end(JSON.stringify('Successufully deleted'));
                    }
                    else {
                        throw new Error('Subject not found');
                    }
                })
                .catch(error => { errorHandler(res, 31, error); });
            break;
        }

        case '/api/auditoriumtypes': {
            collections.Auditorium_type.destroy(
                { where: { auditorium_type: pathParameters[3] } }
            )
                .then(result => {
                    if (result == 1) {
                        res.end(JSON.stringify('Successufully deleted'));
                    }
                    else {
                        throw new Error('Auditorium_type not found');
                    }
                })
                .catch(error => { errorHandler(res, 31, error); });
            break;
        }

        case '/api/auditoriums': {
            collections.Auditorium.destroy(
                { where: { auditorium: pathParameters[3] } }
            )
                .then(result => {
                    if (result == 1) {
                        res.end(JSON.stringify('Successufully deleted'));
                    }
                    else {
                        throw new Error('Auditorium_type not found');
                    }
                })
                .catch(error => { errorHandler(res, 31, error); });
            break;
        }

        case '/api/teachers': {
            collections.Teacher.destroy(
                { where: { teacher: pathParameters[3] } }
            )
                .then(result => {
                    if (result == 1) {
                        res.end(JSON.stringify('Successufully deleted'));
                    }
                    else {
                        throw new Error('Teacher not found');
                    }
                })
                .catch(error => { errorHandler(res, 31, error); });
            break;
        }

        default: {
            res.end("API not exist pathname");
            break;
        }
    }
};