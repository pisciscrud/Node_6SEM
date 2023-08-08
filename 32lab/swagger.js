let openapi = {
    openapi: '3.0.1',
    paths: {
        '/ts': {
            get: {
                tags: ['CRUD'],
                description: 'Get phone dictionary',
                operationId: 'getTS',
                responses: {
                    '200': {
                        description: 'Dictionary list',
                        content: {
                            'application/json': {
                                schema: { type: 'object'},
                                example:
                                {
                                    "number": "11111111",
                                    "name": "test"
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['CRUD'],
                description: 'Post phone dictionary',
                operationId: 'postTS',
                requestBody: {
                    content: {
                        'application/json': {
                            name: 'Dictionary line',
                            schema: { type: 'object'},
                            required: true,
                            description: 'Post data for dictionary',
                            example:
                            {
                                "number": "111111111",
                                "name": "test"
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'OK message for post',
                        content: {
                            'application/json': {
                                schema: { type: 'object'},
                                example: {
                                    message: 'Added'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: { type: 'object'},
                                example: {
                                    message: 'Invalid parameters'
                                }
                            }
                        }
                    }
                }
            },
            put: {
                tags: ['CRUD'],
                description: 'Put phone dictionary',
                operationId: 'putTS',
                requestBody: {
                    content: {
                        'application/json': {
                            name: 'Dictionary line',
                            schema: { type: 'object'},
                            required: true,
                            description: 'Put data for dictionary',
                            example:
                            {
                                "number": "1111111111",
                                "name": "user"
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'OK message for put',
                        content: {
                            'application/json': {
                                schema: { type: 'object'},
                                example: {
                                    message: 'Updated'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: { type: 'object'},
                                example: {
                                    message: 'Invalid parameters'
                                }
                            }
                        }
                    }
                }
            },
            delete: {
                tags: ['CRUD'],
                description: 'Delete phone dictionary',
                operationId: 'delTS',
                parameters: [
                    {
                        name: 'name',
                        in: 'query',
                        schema: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 15
                        },
                        required: true,
                        description: 'Number in dictionary for delete'
                    }
                ],
                responses: {
                    '200': {
                        description: 'OK message for delete',
                        content: {
                            'application/json': {
                                schema: { type: 'object'},
                                example: {
                                    message: 'Deleted'
                                }
                            }
                        }
                    }
                 
                }
            }
        }
    }
};


module.exports = openapi;
