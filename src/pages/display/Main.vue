/* 展示 列表页 */
<template lang="html">

  <el-menu>
    <el-menu-item index="0" @click="toIndex">Main</el-menu-item>
    <el-menu-item index="1" @click="toList">List</el-menu-item>
    <el-menu-item index="2" @click="toCategory">Category</el-menu-item>
  </el-menu>

</template>

<script>
// import axios from 'axios'

export default {
  name: 'Main',
  data: function () {
    return {
      title: 'main page'
    }
  },
  methods: {
    // 跳转至list页面
    toIndex: function (id) {
      this.$router.push('/')
    },
    toList: function (id) {
      this.$router.push('/list/')
    },
    toCategory: function (id) {
      this.$router.push('/category/')
    }
  },

  // 页面初始化进来查询数据
  mounted: function () {
    // this.getAll()
    // this.getCategories()
  }
}
</script>

<style lang="css">
  .tableHeader {
    color: #000;
  }
  div.list {
    width: 90%;
    margin: 0 auto;
  }
  .addBtn {
    margin: 50px auto 0;
    display: block;
  }
  .addArea .el-input {
    width: 200px;
  }
  .addPicArea .el-input {
    width: 500px;
  }
  .addForm {
    overflow: hidden;
  }
  .addForm .el-form-item {
    float: left;
  }
  .sexArea {
    width: 200px;
  }
  .addFormArea .el-dialog__header .el-dialog__title {
    text-align: left;
  }
</style>

<!-- <style lang="stylus" scoped>
@import '~@/assets/stylesheet/pages/list.styl';
</style>
-->
