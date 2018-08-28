var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');

/**
 * 使用 bluebird 诺言库
 */
mongoose.Promise = require('bluebird');

/**
 * 连接数据库
 */
exports.connect = function (callback) {
  async.waterfall([
    function (callback) {
      fs.readFile(path.join(__dirname, './database.config.js'), function (err, file) {
        if (err && err.code === 'ENOENT') {
          var err = {
            type: 'system',
            error: 'database.config.js 文件不存在'
          };

          return callback(err);
        } else if (err) {
          err.type = 'system';
          return callback(err);
        }

        var databaseConfig = require('./database.config');

        callback(null, databaseConfig);
      });
    },
    function (config, callback) {
      mongoose.connect('mongodb://' + config.host + ':' + config.port + '/' + config.db, {
        user: config.user,
        pass: config.pass
      }, function (err) {
        if (err) {
          err.type = 'database';
          return callback(err);
        }

        callback();
      });
    }
  ], function (err) {
    if (err) return callback(err);

    callback();
  });
};
