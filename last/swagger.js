const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Phonebook API',
      version: '1.0.0',
    },
  },
  apis: ['swagger.js'],
};

const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
let phoneBook = [
    { id: 1, name: 'John Doe', phone: '123456789' },
    { id: 2, name: 'Jane Smith', phone: '987654321' },
  ];
app.get('/TS', (req, res) => {
    res.json(phoneBook);
  });
  
  // Добавить новый телефон в справочник
  app.post('/TS', (req, res) => {
    const newPhone = req.body;
    phoneBook.push(newPhone);
    res.json({ message: 'Phone added successfully' });
  });
  
  // Скорректировать строку справочника
  app.put('/TS/:id', (req, res) => {
    const phoneId = parseInt(req.params.id);
    const updatedPhone = req.body;
  
    phoneBook = phoneBook.map((phone) =>
      phone.id === phoneId ? { ...phone, ...updatedPhone } : phone
    );
  
    res.json({ message: 'Phone updated successfully' });
  });
  
  // Удалить строку справочника
  app.delete('/TS/:id', (req, res) => {
    const phoneId = parseInt(req.params.id);
  
    phoneBook = phoneBook.filter((phone) => phone.id !== phoneId);
  
    res.json({ message: 'Phone deleted successfully' });
  });

app.listen(3000, () => {
  console.log('REST API server is running on port 3000');
});