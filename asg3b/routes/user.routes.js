const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/', UserController.create);
router.get('/', UserController.findAll);
router.get('/:id', UserController.findOne);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.destroy);
router.get('/email/:email', UserController.findByEmail);


module.exports = router;
