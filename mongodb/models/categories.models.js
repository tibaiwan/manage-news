var mongoose = require('mongoose');

/**
 * 栏目模型
 */
var categoriesSchema = new mongoose.Schema({
  // 分类名
  name: {
    type: String,
    required: true
  },

  // 目录
  path: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[A-z0-9\-\_\/]+$/,
    sparse: true
  },

  // 是否在导航中显示
  isShow: {
    type: Boolean,
    default: true
  },

  // 排序
  sort: {
    type: Number,
    default: 0
  },

  // 关键字
  keywords: String,

  // 描述
  description: String
  
}, {
  collection: 'categories',
  id: false
});

module.exports = mongoose.model('Categories', categoriesSchema);