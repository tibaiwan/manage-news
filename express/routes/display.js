var express = require('express');
var router = express.Router();
// var category = require('../controllers/categories.controllers.hbs.js')
var content = require('../controllers/contents.controllers.hbs.js')

/* 查询新闻列表和内容 */
router.get('/list', content.list);
router.get('/detail/:_id', content.one);

module.exports = router;
