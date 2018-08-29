// var logger = require('../../lib/logger.lib');
var contentsService = require('../services/contents.services');
var output = require('./formatOutput.js')
// var contentMock = require('../../mongodb/mock/content.mock.js');
var fs = require("fs");
var path = require("path");
let PAGE_PATH = path.resolve(__dirname, '../../static/pages');

/**
 * 单条内容
 * @param {Object} req
 *        {MongoId} req.params._id
 * @param {Object} res
 */
exports.one = function (req, res) {
  var file = PAGE_PATH + "/" + req.params._id + '.html';
  contentsService.one({_id: req.params._id }, function (err, result) {
    if (err) {
      return res.status(500).end();
    }
    // 判断文件是否已经生成
    fs.exists(file, function (exists) {
      if (exists) {
        console.log("页面已存在！");
        res.sendFile(file, function(err){
          console.log(err)
        })
      } else {
        res.render('news-detail', result, function(err, html){
          fs.writeFile(file, html, function(err){
            if (err) {
              return console.error(err);
            }
            console.log("页面生成成功！");
            res.sendFile(file, function(err){
              console.log(err)
            })
          })
        });
      }
    });
  });
};

/**
 * 多条内容
 * @param {Object} req
 *        {Boolean} req.query.deleted
 *        {MongoId} req.query.category
 *        {Number} req.query.pageSize
 *        {Number} req.query.currentPage
 * @param {Object} res
 */
exports.list = function (req, res) {
  req.checkQuery({
    'deleted': {
      optional: true,
      isBoolean: { errorMessage: 'deleted 需为布尔值' }
    },
    'categoryId': {
      optional: true,
      isMongoId: { errorMessage: 'categoryId 需为 mongoId' }
    },
    'pageSize': {
      optional: true,
      isInt: { errorMessage: 'pageSize 需为数字' }
    },
    'currentPage': {
      optional: true,
      isInt: { errorMessage: 'currentPage 需为数字' }
    }
  });

  if (req.validationErrors()) {
    output.error(res, req.validationErrors());
  }

  var query = {};
  if (req.query._id) query._id = req.query._id;
  if (req.query.deleted === 'true') {
    query.deleted = true;
  } else if (req.query.deleted === 'false') {
    query.deleted = false;
  }
  if (req.query.pageSize) query.pageSize = req.query.pageSize;
  if (req.query.currentPage) query.currentPage = req.query.currentPage;

  contentsService.list(query, function (err, result) {
    if (err) {
      output.exception(res, err);
    }
    console.log('content query result: ', result)
    res.render('news-list', {newsList: result.contents});
  });
};
