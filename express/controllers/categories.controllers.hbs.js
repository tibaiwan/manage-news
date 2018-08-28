var _ = require('lodash');
var categoriesService = require('../services/categories.services.js');
var output = require('./formatOutput.js')
var newsListMock = require('../../mongodb/mock/newslist.mock.js');

/**
 * 查询分类
 * @param {Object} req
 *        {Object} req.query
 * @param {Object} res
 */
exports.query = function (req, res) {
  var parameters = req.body;
  if (!_.isEmpty(parameters)) {
    categoriesService.one(parameters, function (err, category) {
      if (err) {
        output.exception(res, err);
      }
      output.res(res, category);
      res.render('news-list', {newsList: [category]});
    });
  } else {
    categoriesService.all(function (err, categories) {
      if (err) {
        output.exception(res, err);
      }
      res.render('news-list', {newsList: newsListMock.newsList});
    });
  }
};

/**
 * 查询指定分类
 * @param {Object} req
 *        {MongoId} req.params._id
 * @param {Object} res
 */
exports.one = function (req, res) {
  req.checkBody({
    'parameters._id': {
      notEmpty: {
        options: [true],
        errorMessage: '_id 不能为空'
      },
      isMongoId: { errorMessage: '_id 需为 mongoId' }
    }
  });

  if (req.validationErrors()) {
    // logger.system().error(__filename, '参数验证失败', req.validationErrors());
    // return res.status(400).end();
    output.error(res, req.validationErrors());
  }

  var _id = req.body.parameters._id;

  if (_.isEmpty(_id)) return res.status(400).end();

  categoriesService.one({ _id: _id }, function (err, category) {
    if (err) {
      // logger[err.type]().error(err);
      // return res.status(500).end();
      output.exception(res, err);
    }

    // res.status(200).json(category);
    output.res(res, category);
  });
};
