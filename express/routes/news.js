var express = require('express');
var router = express.Router();

/* 获取新闻 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* 获取新闻列表 */
router.get('/list', function(req, res, next) {
  res.render('index', { title: '新闻列表' });
});

module.exports = router;
