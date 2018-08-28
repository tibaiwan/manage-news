var _ = require('lodash');
var expressValidator = require('express-validator');

/**
 * 自定义验证
 */
module.exports = function () {
  return expressValidator({
    errorFormatter: function (param, message, value) {
      return {
        param: param,
        message: message,
        value: value
      };
    },
    customValidators: {
      isString: function (value) { return _.isString(value) },
      isEmail: function (value) { return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) },
      isNumber: function (value) { return _.isNumber(value) },
      isObject: function (value) { return _.isObject(value) },
      isArray: function (value) { return _.isArray(value) },
      isBoolean: function (value) {
        switch (typeof value) {
          case 'string':
            return value === 'true' || value === 'false';
            break;
          case 'boolean':
            return value === true || value === false;
            break;
          default:
            return false;
        }
      }
    }
  });
};