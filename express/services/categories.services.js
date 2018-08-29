var async = require('async');
var _ = require('lodash');
var categoriesModel = require('../../mongodb/models/categories.models.js');

/**
 * 所有分类
 * @param {Function} callback
 */
exports.all = function (callback) {
  categoriesModel.find({})
    .select('name path isShow sort keywords description')
    .exec(function (err, categories) {
      if (err) {
        err.type = 'database';
        return callback(err);
      }

      categories = _.map(categories, function (category) {
        category = category.toObject();
        return category;
      });

      // cache.set('categories', categories, 1000 * 60 * 60 * 24);

      callback(err, categories);
    });
};

/**
 * 单个分类
 * @param {Object} options
 *        {MongoId} options._id
 *        {String} options.path
 *        {String} options.type
 * @param {Function} callback
 */
exports.one = function (options, callback) {
  var query = {};

  if (options._id) query._id = options._id;
  if (options.path) query.path = options.path;
  exports.all(function (err, categories) {
    if (err) return callback(err);
    var category = _(categories)
      .map(function (category) {
        category._id = category._id.toString();
        return category;
      })
      .find(query);
    if (category) {
      callback(null, category);
    } else {
      callback(null, null);
    }
  });
};

/**
 * 保存分类
 * @param {Object} options
 *        {MongoId} options._id
 *        {String} options.data
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

  var _id = options._id;
  var data = options.data;
  console.log("_id="+_id)
  if (_id) {
    // update
    async.waterfall([
      function (callback) {
        categoriesModel.findByIdAndUpdate(_id, data, { runValidators: true }, function (err, category) {
          if (err) return callback(err);

          callback(null, category);
        });
      },
      function (oldCategory, callback) {
        if (data.path === oldCategory.path) return callback();

        var regex = new RegExp('^' + oldCategory.path + '/');

        categoriesModel.find({ path: regex }, function (err, categories) {
          if (err) return callback(err);

          async.each(categories, function (category) {
            if (category.path) {
              category.path = category.path.replace(oldCategory.path, data.path);
            }

            category.save(function (err) { callback(err) });
          }, function (err) {
            if (err) return callback(err);

            callback();
          });
        });
      }
    ], function (err) {
      if (err) {
        err.type = 'database';
        return callback(err);
      }

      // cache.del('categories');

      callback();
    });
  } else {
    // 新建
    async.waterfall([
      function (callback) {
        new categoriesModel(data).save(function (err, category) {
          if (err) {
            err.type = 'database';
            return callback(err);
          }

          callback(null, category);
        });
      }
    ], function (err, category) {
      if (err) return callback(err);

      // cache.del('categories');

      callback(null, category);
    });
  }
};

/**
 * 删除分类
 * @param {Object} options
 * @param {Function} callback
 */
exports.remove = function (options, callback) {
  if (!options._id) {
    var err = {
      type: 'system',
      error: '没有 id 传入'
    };

    return callback(err);
  }

  var _id = options._id;

  async.series({
    // 删除当前分类
    removeCurrent: function (callback) {
      categoriesModel.findByIdAndRemove(_id, function (err, category) {
        if (err) {
          err.type = 'database';
          return callback(err);
        }

        // 没有查到则结束
        if (!category) return callback();

        callback(null, category);
      });
    },
  }, function (err) {
    if (err) return callback(err);

    // cache.del('categories');

    callback(null);
  });
};
