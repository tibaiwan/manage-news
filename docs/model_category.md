## 数据模型

### 新闻分类 category

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
    <td>path</td>
    <td>目录</td>
    <td>String</td>
    <td></td>
    <td>是</td>
    <td>符合正则：/^[A-z0-9\-\_\/]+$/</td>
  </tr>
  <tr>
    <td>isShow</td>
    <td>是否在导航中显示</td>
    <td>Boolean</td>
    <td>true</td>
    <td>是</td>
    <td></td>
  </tr>
  <tr>
    <td>sort</td>
    <td>排序</td>
    <td>Number</td>
    <td>0</td>
    <td>是</td>
    <td></td>
  </tr>
  <tr>
    <td>keywords</td>
    <td>关键字</td>
    <td>String</td>
    <td></td>
    <td>是</td>
    <td></td>
  </tr>
  <tr>
    <td>description</td>
    <td>描述</td>
    <td>String</td>
    <td></td>
    <td>是</td>
    <td></td>
  </tr>
</table>

## 新闻分类API 增删查改方法 本地示例

### create
```bash
Request URL: http://localhost:3000/category/create
Request Method: POST
Body:
{
  "parameters": {
    "name": "体育",
    "isShow": true,
    "sort": 1,
    "path": "/sports",
    "keywords": "足球，篮球",
    "description": "体育模块"
  }
}
```

### update
```bash
Request URL: http://localhost:3000/category/update  
Request Method: POST  
Body:  
{
  "parameters": {
    "id": 10000,
    "name": "体育UP",
    "isShow": true,
    "sort": 1,
    "path": "/sports",
    "keywords": "足球，篮球",
    "description": "体育模块"
  }
}
```

### query all
```bash
Request URL: http://localhost:3000/category/query
Request Method: POST
Body: null
```

### query one
```bash
Request URL: http://localhost:3000/category/one
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
Request URL: http://localhost:3000/category/remove
Request Method: POST
Body:
{
  "parameters": {
    "id": 10000
  }
}
```
