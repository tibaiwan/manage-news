/* 新闻中心 后台管理页面 */
var express = require('express');
var path = require("path");
var router = express.Router();
var ManageSystemPath = path.resolve(__dirname, '../../dist')

router.get('/', function(req, res) {
  console.log('ManageSystemPath', ManageSystemPath)
  res.sendFile(ManageSystemPath + '/index.html');
});

module.exports = router;
