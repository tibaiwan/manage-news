var express = require('express');
var router = express.Router();

/* 获取新闻 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* 获取新闻列表 */
router.get('/list', function(req, res) {
  /* 从数据库获取数据 */
  var newsList = [
    {
      title: '新闻标题新闻标题新闻标题新闻标题新闻标题',
      content: '新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容'
    },{
      title: '新闻标题新闻标题新闻标题新闻标题新闻标题',
      content: '新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容'
    },{
      title: '新闻标题新闻标题新闻标题新闻标题新闻标题',
      content: '新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容'
    }
  ]
  /* 模板渲染 */
  res.render('news-list', {newsList});
});

/* 根据id查看具体新闻 */
router.get('/detail/:id', function(req, res) {
  console.log('news id:', req.params.id);
  /* 模板渲染 */
  res.render('news-detail', {newDetail: '新闻详情', id: req.params.id});
});

/* 添加新闻 */
router.post('/add', function(req, res) {
});

/* 更新新闻 */
router.put('/update/:id', function(req, res) {
  res.send('news id:' + req.params.id);
});

/* 删除新闻 */
router.delete('/delete/:id', function(req, res) {
  res.send('news id:' + req.params.id);
});

module.exports = router;
