## 数据模型

### 新闻内容 news

<table style="text-align: left;">
  <tr>
    <th>字段名称</th>
    <th>释义</th>
    <th>类型</th>
    <th>默认值</th>
    <th>是否必填</th>
    <th>其他</th>
  </tr>
  <tr>
    <td>category</td>
    <td>栏目 ID</td>
    <td>ObjectId</td>
    <td></td>
    <td>是</td>
    <td></td>
  </tr>
  <tr>
    <td>title</td>
    <td>标题</td>
    <td>String</td>
    <td></td>
    <td>是</td>
    <td></td>
  </tr>
  <tr>
    <td>content</td>
    <td>内容</td>
    <td>String</td>
    <td></td>
    <td>是</td>
    <td></td>
  </tr>
  <tr>
    <td>date</td>
    <td>发布时间</td>
    <td>Date</td>
    <td></td>
    <td>否</td>
    <td>新增字段</td>
  </tr>
  <tr>
    <td>status</td>
    <td>状态</td>
    <td>draft</td>
    <td></td>
    <td>是</td>
    <td>enum: ['draft', 'pushed']</td>
  </tr>
  <tr>
    <td>deleted</td>
    <td>放入回收站</td>
    <td>Boolean</td>
    <td>false</td>
    <td>是</td>
    <td></td>
  </tr>
</table>

## 新闻内容API 增删查改方法 本地示例

### create
```bash
Request URL: http://localhost:3000/content/create
Request Method: POST
Body:
{
  "parameters": {
    "category": "ObjectIdXXX",
    "title": "这个是新闻标题",
    "内容": "这个是新闻内容，富文本支持",
    "status": "draft",
    "deleted": false
  }
}
```

### update
```bash
Request URL: http://localhost:3000/content/update  
Request Method: POST  
Body:  
{
  "parameters": {
    "id": 10000,
    "category": "ObjectIdXXX",
    "title": "这个是新闻标题UP",
    "内容": "这个是新闻内容，富文本支持",
    "status": "draft",
    "deleted": false
  }
}
```

### query all
```bash
Request URL: http://localhost:3000/content/query
Request Method: POST
Body: null
```

### query one
```bash
Request URL: http://localhost:3000/content/one
Request Method: POST
Body:
{
  "parameters": {
    "id": 10000
  }
}
```

### remove
```bash
Request URL: http://localhost:3000/content/remove
Request Method: POST
Body:
{
  "parameters": {
    "id": 10000
  }
}
```
