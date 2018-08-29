var _ = require('lodash');
// var cache = require('../../lib/cache.lib');
var categoriesService = require('../services/categories.services.js');
// var logger = require('../../lib/logger.lib');
var output = require('./formatOutput.js')

/**
 * 查询分类
 * @param {Object} req
 *        {Object} req.query
 * @param {Object} res
 */
exports.query = function (req, res) {
  var parameters = req.body;
  console.log(req)
  console.log(req.body)
  if (!_.isEmpty(parameters)) {
    categoriesService.one(parameters, function (err, category) {
      if (err) {
        // logger[err.type]().error(err);
        // return res.status(500).end();
        output.exception(res, err);
      }
      // res.status(200).json(category);
      output.res(res, category);
    });
  } else {
    categoriesService.all(function (err, categories) {
      if (err) {
        // logger[err.type]().error(err);
        // return res.status(500).end();
        output.exception(res, err);
      }
      output.res(res, categories);
      //res.status(200).json(categories);
      // res.status(200).json(interceptors.res(categories));
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

/**
 * 创建分类
 * @param {Object} req
 *        {String} req.body.type
 *        {String} req.body.name
 *        {Boolean} req.body.isShow
 *        {Number} req.body.sort
 * @param {Object} res
 */
exports.create = function (req, res) {
  if (req.body.parameters._id) {
    req.checkBody({
      'parameters.name': {
        notEmpty: {
          options: [true],
          errorMessage: 'name 不能为空'
        },
        isString: { errorMessage: 'name 需为字符串' }
      },
      'parameters.isShow': {
        notEmpty: {
          options: [true],
          errorMessage: 'isShow 不能为空'
        },
        isBoolean: { errorMessage: 'isShow 需为布尔值' }
      },
      'parameters.sort': {
        optional: true,
        isNumber: { errorMessage: 'sort 需为数字' }
      },
      'parameters.path': {
        notEmpty: {
          options: [true],
          errorMessage: 'path 不能为空'
        },
        isString: { errorMessage: 'path 需为布尔值' }
      },
      'parameters.keywords': {
        optional: true,
        isString: { errorMessage: 'keywords 需为字符串' }
      },
      'parameters.description': {
        optional: true,
        isString: { errorMessage: 'description 需为字符串' }
      }
    });

  }
  if (req.validationErrors()) {
    // logger.system().error(__filename, '参数验证失败', req.validationErrors());
    try {
      output.error(res, req.validationErrors());
      // return res.status(400).send(interceptors.error(req.validationErrors()));
    } catch (e) {
      console.log(e)
    }
  }
  var data = {
    name: req.body.parameters.name,
    isShow: req.body.parameters.isShow,
    sort: req.body.parameters.sort,
    path: req.body.parameters.path,
    keywords: req.body.parameters.keywords,
    description: req.body.parameters.description
  };
  categoriesService.save({ data: data }, function (err, category) {
    if (err) {
      // logger[err.type]().error(__filename, err);
      // return res.status(500).end(err);
      output.exception(res, err);
    }
    // output.res(res, {_id: category._id});
    res.status(200).json({_id: category._id});
  });
};

/**
 * 更新分类
 * @param {Object} req
 *        {MongoId} req.params._id
 *        {String} req.body.type
 *        {String} req.body.name
 *        {Boolean} req.body.isShow
 *        {Number} req.body.sort
 * @param {Object} res
 */
exports.update = function (req, res) {
  if (req.body.parameters._id) {
    console.log("进入req 里面==="+req.body.parameters._id);
    req.checkBody({
      'parameters._id': {
        notEmpty: {
          options: [true],
          errorMessage: '_id 不能为空'
        },
        isMongoId: { errorMessage: '_id 需为 mongoId' }
      },
      'parameters.name': {
        notEmpty: {
          options: [true],
          errorMessage: 'name 不能为空'
        },
        isString: { errorMessage: 'name 需为字符串' }
      },
      'parameters.isShow': {
        notEmpty: {
          options: [true],
          errorMessage: 'isShow 不能为空'
        },
        isBoolean: { errorMessage: 'isShow 需为布尔值' }
      },
      'parameters.sort': {
        optional: true,
        isNumber: { errorMessage: 'sort 需为数字' }
      },
      'parameters.path': {
        notEmpty: {
          options: [true],
          errorMessage: 'path 不能为空'
        },
        isString: { errorMessage: 'path 需为布尔值' }
      },
      'parameters.keywords': {
        optional: true,
        isString: { errorMessage: 'keywords 需为字符串' }
      },
      'parameters.description': {
        optional: true,
        isString: { errorMessage: 'description 需为字符串' }
      }
    });

  }

  if (req.validationErrors()) {
    // logger.system().error(__filename, '参数验证失败', req.validationErrors());
    // return res.status(400).end(req.validationErrors());
    output.error(res, req.validationErrors());
  }

  var _id = req.body.parameters.id;
  if (req.body.parameters._id) {
    _id = req.body.parameters._id;
  }

  var data = {};

  if (req.body.parameters.name) data.name = req.body.parameters.name;
  if (_.isBoolean(req.body.parameters.isShow)) data.isShow = req.body.parameters.isShow;
  if (_.isNumber(req.body.parameters.sort)) data.sort = req.body.parameters.sort;
  if (req.body.parameters.path) data.path = req.body.parameters.path;
  if (req.body.parameters.keywords) data.keywords = req.body.parameters.keywords;
  if (req.body.parameters.description) data.description = req.body.parameters.description;

  categoriesService.save({ _id: _id, data: data }, function (err) {
    if (err) {
      console.log(err)
      // logger[err.type]().error(__filename, err);
      // return res.status(500).end();
      output.exception(res, err);
    }

    res.status(204).end();
    // output.res(res, {_id: _id});

  });
};

/**
 * 删除分类
 * @param {Object} req
 *        {MongoId} req.params._id
 * @param {Object} res
 */
exports.remove = function (req, res) {
  req.checkBody({
    'parameters.id': {
      notEmpty: {
        options: [true],
        errorMessage: '_id 不能为空'
      },
      isMongoId: { errorMessage: '_id 不能为空' }
    }
  });

  if (req.validationErrors()) {
    // logger[err.type]().error(__filename, '参数验证失败', req.validationErrors());
    // return res.status(400).end(req.validationErrors());
    output.error(res, req.validationErrors());
  }

  var _id = req.body.parameters.id;

  categoriesService.remove({ _id: _id }, function (err) {
    if (err) {
      // logger[err.type]().error(__filename, err);
      // return res.status(500).end();
      output.exception(res, err);
    }

    // res.status(204).end();
    output.res(res, {});
  });
};
