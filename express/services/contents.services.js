var async = require('async');
var _ = require('lodash');
var contentsModel = require('../../mongodb/models/contents.models');

/**
 * 单条内容
 * @param {Object} options
 *        {MongoId} options._id
 *        {String} options.status
 *        {String} options.alias
 *        {Boolean} options.reading
 * @param {Function} callback
 */

exports.one = function (options, callback) {
  var query = {};

  if (options._id) query._id = options._id;
  if (options.status) query.status = options.status;

  contentsModel.findOne(query)
    .select('status category title abstract content')
    .populate('category', 'name path')
    .exec(function (err, content) {
      if (err) {
        err.type = 'database';
        return callback(err);
      }
      if (!content) return callback();
      content = content.toObject();
      if (_.get(content, 'category.path')) content.url = content.category.path + '/' + content._id;
      callback(null, content);
    });
};

/**
 * 多条内容
 * @param {Object} options
 *        {MongoId} options._id
 *        {Boolean} options.deleted
 *        {String|Array} options.type
 *        {Number} options.currentPage
 *        {Number} options.pageSize
 * @param {Function} callback
 */
exports.list = function (options, callback) {
  var query = {};
  var currentPage = 1;
  var pageSize = 50;

  if (options.categoryId) query.categoryId = options.categoryId;
  if (options.status) query.status = options.status;
  if (_.isBoolean(options.deleted)) query.deleted = options.deleted;
  if (options.currentPage) currentPage = parseInt(options.currentPage);
  if (options.pageSize) pageSize = parseInt(options.pageSize);
  if (options.date) query.date = options.date;

  async.waterfall([
    function (callback) {
      contentsModel.count(query, function (err, count) {
        if (err) {
          err.type = 'database';
          return callback(err);
        }

        if (count) {
          callback(null, count);
        } else {
          callback(null, null);
        }
      });
    },
    function (count, callback) {
      contentsModel.find(query)
        .sort('status')
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize)
        .select('status category title abstract content thumbnail media date')
        .populate('category', 'name path')
        .exec(function (err, contents) {
          if (err) {
            err.type = 'database';
            return callback(err);
          }
          contents = _.map(contents, function (content) {
            content = content.toObject();
            if (_.get(content, 'category.path')) content.url = content.category.path + '/' + content._id;

            return content;
          });

          // console.log(contents)
          callback(null, count, contents);
        });
    }
  ], function (err, count, contents) {
    if (err) return callback(err);

    var result = {
      contents: contents,
      pages: Math.ceil(count / pageSize)
    };

    callback(err, result);
  });
};

/**
 * 存储内容
 * @param {Object} options
 *        {MongoId} options._id
 *        {String} options.data
 *        {Boolean} options.multi
 * @param {Function} callback
 */
exports.save = function (options, callback) {
  if (!options.data) {
    var err = {
      type: 'system',
      error: '没有 data 传入'
    };

    return callback(err);
  }

  var data = options.data;
  var _id = options._id;
  var ids = options.ids;

  if (ids) {
    contentsModel.update({ $in: { _id: ids } }, data, { multi: true, runValidators: true }, function (err) {
      if (err) {
        err.type = 'database';
        return callback(err);
      }

      callback();
    });
  } else if (_id) {
    async.waterfall([
      function (callback) {
        contentsModel.findByIdAndUpdate(_id, data, { runValidators: true }, function (err, oldContent) {
          callback(err, oldContent);
        });
      }
    ], function (err) {
      if (err) {
        err.type = 'database';
        return callback(err);
      }
      callback();
    });
  } else {
    async.waterfall([

      function (callback) {
        new contentsModel(data).save(function (err, content) {
          console.log(err)
          callback(err, content);
        });
      },
    ], function (err) {
      if (err) {
        err.type = 'database';
        return callback(err);
      }

      callback();
    });
  }
};

/**
 * 删除内容
 * @param {Object} options
 *        {MongoId} options._id
 * @param {Function} callback
 */
exports.remove = function (options, callback) {
  if (!options._id && !options.ids) {
    var err = {
      type: 'system',
      error: '没有 _id 或 ids 传入'
    };

    return callback(err);
  }

  var _id = options._id;
  contentsModel.findById(_id)
  .exec(function (err, content) {
    if (err) {
      err.type = 'database';
      return callback(err);
    }

    if (!content) return callback();

    async.waterfall([
      function (callback) {
        contentsModel.findByIdAndRemove(_id, function (err, oldContent) {
          callback(err, oldContent.toObject());
        });
      }
    ], function (err) {
      if (err) {
        err.type = 'database';
        return callback(err);
      }

      callback();
    });

    /*if (content.deleted === false) {
      content.deleted = true;
      content.save(function (err) {
        if (err) {
          err.type = 'database';
          return callback(err);
        }

        callback();
      });
    } else {
      // -------------
    } */
  })
}
