const express = require('express');
const telephoneController = require('../controllers/telephoneController.js');
const telephoneRouter = express.Router();

telephoneRouter.get('/', telephoneController.index);
telephoneRouter.get('/Add', telephoneController.add);

telephoneRouter.post('/Add', telephoneController.addTelephone);
telephoneRouter.get('/Update', telephoneController.update);

telephoneRouter.post('/Update', telephoneController.updateTelephone);
telephoneRouter.post('/Delete', telephoneController.deleteTelephone);



module.exports = telephoneRouter;