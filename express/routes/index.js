var express = require('express');
var router = express.Router();
var content = require('../controllers/contents.controllers.js');
var category = require('../controllers/categories.controllers.js');

router.post('/category/one', category.one);
router.post('/category/query', category.query);
router.post('/category/create', category.create);
router.post('/category/update', category.update);
router.post('/category/remove', category.remove);

router.post('/content/query', content.list);
router.post('/content/create', content.create);
router.post('/content/update', content.update);
router.post('/content/remove', content.remove);
router.post('/content/one', content.one);

module.exports = router;
