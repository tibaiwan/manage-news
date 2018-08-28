var mongoose = require('mongoose');

/**
 * 内容模型
 */
var contentsSchema = new mongoose.Schema({
  //状态
  status: {
    type: String,
    default: 'draft',
    enum: ['draft', 'pushed']
  },

  // 放入回收站
  deleted: {
    type: Boolean,
    default: false
  },

  //栏目 ID
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories',
    required: true
  },
  //标题
  title: {
    type: String,
    required: true
  },
  //摘要
  abstract: String,
  //内容
  content: String,
  //缩略图
  thumbnail: String,
  //图片
  media: String,
  //日期
  date: Date
}, {
  collection: 'contents',
  id: false
});

module.exports = mongoose.model('Contents', contentsSchema);
