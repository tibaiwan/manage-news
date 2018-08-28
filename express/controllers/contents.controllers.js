var _ = require('lodash');
// var logger = require('../../lib/logger.lib');
var output = require('./formatOutput.js')
var contentsService = require('../services/contents.services');

/**
 * 单条内容
 * @param {Object} req
 *        {MongoId} req.params._id
 *        {Boolean} req.params.reading
 * @param {Object} res
 */
exports.one = function (req, res) {
  req.checkBody({
    'parameters.id': {
      notEmpty: {
        options: [true],
        errorMessage: 'id 不能为空'
      },
      isMongoId: { errorMessage: 'id 需为 mongoId' }
    }
  });

  if (req.validationErrors()) {
    // logger.system().error(__filename, '参数验证失败', req.validationErrors());
    output.error(res, req.validationErrors());
  }

  var _id = req.body.parameters.id;

  contentsService.one({_id: _id }, function (err, content) {
    if (err) {
      // logger[err.type]().error(err);
      output.exception(res, err);
    }
    output.res(res, content);
    // res.status(200).json(content);
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
  console.log(req)
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
    // logger.system().error(__filename, '参数验证失败', req.validationErrors());
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
      // logger[err.type]().error(err);
      output.exception(res, err);
    }

    output.res(res, result);
    // res.status(200).json(result);
  });
};

/**
 * 新增内容
 * @param {Object} req
 *        {Boolean} req.query.deleted
 *        {MongoId} req.query.category
 *        {Number} req.query.pageSize
 *        {Number} req.query.currentPage
 * @param {Object} res
 */
exports.create = function (req, res) {

  req.checkBody({
    'parameters.status': {
      notEmpty: {
        options: [true],
        errorMessage: 'status 不能为空'
      },
      isString: { errorMessage: 'status 需为字符串' }
    },
    'parameters.category': {
      notEmpty: {
        options: [true],
        errorMessage: 'category 不能为空'
      },
      isMongoId: { errorMessage: 'category _id 需为 mongoId' }
    },
    'parameters.title': {
      notEmpty: {
        options: [true],
        errorMessage: 'title 不能为空'
      },
      isString: { errorMessage: 'title 需为字符串' }
    },
    'parameters.abstract': {
      optional: true,
      isString: { errorMessage: 'abstract 需为字符串' }
    },
    'parameters.content': {
      optional: true,
      isString: { errorMessage: 'content 需为字符串' }
    }
  });
  if (req.validationErrors()) {
    // logger.system().error(__filename, '参数验证失败', req.validationErrors());
    output.error(res, req.validationErrors());
  }

  var data = {
    status: req.body.parameters.status,
    category: req.body.parameters.category,
    title: req.body.parameters.title,
    abstract: req.body.parameters.abstract,
    content: req.body.parameters.content
  };

  contentsService.save({ data: data }, function (err) {
    if (err) {
      // logger[err.type]().error(__filename, err);
      output.exception(res, err);
    }

    output.res(res, {});
    // res.status(204).end();
  });
};

/**
 * 更新内容
 * @param {Object} req
 *        {MongoId} req.params.content
 *        {[MongoId]} req.query.ids
 *        {Boolean} req.body.part
 *        {String} req.body.status
 *        {Boolean} req.body.deleted
 *        {MongoId} req.body.category
 *        {String} req.body.title
 *        {String} req.body.alias
 *        {Date} req.body.date
 *        {MongoId} req.body.thumbnail
 *        {[MongoId]} req.body.media
 *        {String} req.body.abstract
 *        {String} req.body.content
 *        {[String]} req.body.tags
 *        {Object} req.body.extensions
 * @param {Object} res
 */
exports.update = function (req, res) {
  if (req.body.parameters._id) {
    console.log("进入req 里面==="+req.body.parameters.id);
    req.checkBody({
      'parameters._id': {
        notEmpty: {
          options: [true],
          errorMessage: 'content _id 不能为空'
        },
        isMongoId: { errorMessage: 'content _id 需为 mongoId' }
      },
      'parameters.status': {
        notEmpty: {
          options: [true],
          errorMessage: 'status 不能为空'
        },
        isString: { errorMessage: 'status 需为字符串' }
      },
      'parameters.deleted': {
        optional: true,
        isBoolean: { errorMessage: 'deleted 需为布尔值' }
      },
      'parameters.category': {
        optional: true,
        isMongoId: { errorMessage: 'category 需为 mongoId' }
      },
      'parameters.title': {
        optional: true,
        isString: { errorMessage: 'title 需为字符串' }
      },
      'parameters.abstract': {
        optional: true,
        isString: { errorMessage: 'abstract 需为字符串' }
      },
      'parameters.content': {
        optional: true,
        isString: { errorMessage: 'content 需为字符串' }
      }
    });
  }
  console.log("req.validationErrors()--="+req.validationErrors())
  if (req.validationErrors()) {
    // logger.system().error(__filename, '参数验证失败', req.validationErrors());
    // return res.status(400).end();
    output.error(res, req.validationErrors());
  }

  var data = {};
  
  if (req.body.parameters.status) data.status = req.body.parameters.status;
  if (_.isBoolean(req.body.parameters.deleted)) data.deleted = req.body.parameters.deleted;
  if (req.body.parameters.category) data.category = req.body.parameters.category;
  if (req.body.parameters.title) data.title = req.body.parameters.title;
  if (req.body.parameters.abstract) data.abstract = req.body.parameters.abstract;
  if (req.body.parameters.content) data.content = req.body.parameters.content;
  
  var query = {}
  query._id = req.body.parameters.id;
  query.data = data

  if (req.body.parameters._id) {
    query._id = req.body.parameters._id;
  } else if (req.body.contentIds) {
    query.ids = req.body.contentIds;
  }

  contentsService.save(query, function (err) {
    if (err) {
      // logger[err.type]().error(__filename, err);
      // output.exception(res, err);
      return res.status(500).end();
    }

    // output.res(res, {});
    res.status(204).end();
  });
};

/**
 * 删除内容
 * @param {Object} req
 *        {MongoId} req.params.content
 *        {[MongoId]} req.query.ids
 * @param {Object} res
 */
exports.remove = function (req, res) {
  req.checkBody({
    'parameters.id': {
      notEmpty: {
        options: [true],
        errorMessage: 'id 不能为空'
      },
      isMongoId: { errorMessage: 'id 需为 mongoId' },
    }
  })
  if (req.validationErrors()) {
    // logger.system().error(__filename, '参数验证失败', req.validationErrors());
    output.error(res, req.validationErrors());
  }

  var query = {};
  query._id = req.body.parameters.id

  contentsService.remove(query, function (err) {
    if (err) {
      // logger[err.type]().error(__filename, err);
      output.exception(res, err);
    }

    output.res(res, {});
    // res.status(204).end();
  });
};
