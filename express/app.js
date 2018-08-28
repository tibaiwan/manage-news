
var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var createError = require('http-errors');
var compression = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose')
var validator = require('./lib/validator.lib');
var indexRouter = require('./routes/index');
var displayRouter = require('./routes/display');
var lessMiddleware = require('less-middleware');

var app = express();

// 压缩response
app.use(compression());

// logger中间件优先
app.use(logger('dev'));   

// 解析application/json类型的请求中的body部分
app.use(bodyParser.json());

// 解析application/json类型的请求中的body部分
app.use(bodyParser.json());

// 解析url编码类型的请求中的body部分
app.use(bodyParser.urlencoded({ extended: false }));

// validate middleware
app.use(validator());

// 对http传入的cookie进行解析后赋值给req.cookies
app.use(cookieParser());

// 路由文件
app.use('/', indexRouter);
app.use('/display', displayRouter);

// 这里的isesolcms是数据库的名字，不是表的名字
// mongoose.connect('mongodb://localhost:27017/isesolcms')
// var db = mongoose.connect('mongodb://172.20.30.186:27017/isesolcms')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
  layoutsDir: 'express/views',
  defaultLayout: 'layout',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.use(lessMiddleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
