const express = require('express');
const router = express.Router();
const controller = require('../controllers/itemController');
const { upload } = require('../middleware/fileUpload');

//GET /items: send all items to the user
router.get('/', controller.index);

//GET /items/new: send html form for creating a new item
router.get('/new', controller.new);

//POST /items: create a new item
router.post('/', upload, controller.create);

//GET /items/search: searches items based on keyword
router.get('/search', controller.search);

//GET /items/:id: send details of item identified by id
router.get('/:id', controller.show);

//GET /items/:id/edit: send html form for editing an existing item
router.get('/:id/edit', controller.edit);

//PUT /items/:id: update the item indentified by id
router.put('/:id', upload, controller.update);

//DELETE /items/:id: delete the item identified by id
router.delete('/:id', controller.delete);

module.exports = router;
