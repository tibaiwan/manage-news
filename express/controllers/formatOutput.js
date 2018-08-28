/* 正常输出 */
exports.res = function (res, data) {
  res.json({
    error: null,
    status: 200,
    statusText: 'OK',
    responese: data
  });
};

/* 发生错误 */
exports.error = function (res, errors) {
  res.json({
    error: errors,
    status: 400,
    statusText: '请求有误',
    responese: null
  });
};

/* 发生错误 */
exports.exception = function (res, errors) {
  res.json({
    error: errors,
    status: 500,
    statusText: '服务端发生错误',
    responese: null
  });
};
