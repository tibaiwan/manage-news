# 新闻管理系统（Demo版）

## 模块一：新闻管理（新闻的增删查改）
    技术栈：Vue, Vue-router, Axios, Stylus

## 模块二：新闻展示（新闻的列表和详情）
    技术栈：Express, MongoDB, Mongoose, Handlebars

## 项目结构
<pre>
├── root
  ├── express
      ├── routes
          ├── index.js
          ├── news.js
      ├── views
          ├── index.hbs
          ├── layout.hbs
          ...
  ├── mongoDB
      ├── models (mongoDB 数据模型)
          ├── news.js
          ...
      ├── config
          ├── db.js
          ├── data.js
          ...
  ├── src (Vue 项目结构)
      ├── assets
          ├── images
          └── stylesheet
      ├── components (组件)
          ├── layout
              ├── Header.vue
              ├── Container.vue
              └── Index.vue
          ├── modules (通用组件)
              ├── Panination.vue
              ├── index.js
              ...
          └── pages (按页面功能分组定义组件)
              └── preview
                  ├── List.vue
                  └── Detail.vue
      ├── router (路由配置)
          ├── routes
              └── preview.js
          └── index.js
      ├── App.vue
      └── main.js
</pre>

## 项目搭建：
> 初始化Vue项目并安装依赖：  

    vue init webpack manage-news  
    cd manage-news && npm i
    npm run dev

> 根目录下创建express应用并启动(自定义服务命令)  

    express express # create express app  
    npm run server
