/* 展示 列表页 */
<template lang="html">
  <div class="category">
    <div>Category列表</div>
    <el-table
      :data="tableData"
      stripe
      element-loading-text="拼命加载中"
      header-row-class-name="tableHeader"
      v-loading.fullscreen.lock="loading"
      empty-text="亲，暂时没有数据哦"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="name"
        label="名称"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        align="center"
        width="100">
      </el-table-column>

      <el-table-column
        prop="keywords"
        label="关键字"
        align="center"
        width="150">
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        width="360">
        <template slot-scope="scope">
          <el-button  size="small" type="success" @click="modify(scope.row)">修改</el-button>
          <el-button type="danger" size="small" @click="deleteCategory(scope.row['_id'])">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增分类数据 -->
    <el-dialog title="新增数据" :visible.sync="addFormVisible" class="addArea" modal custom-class="addFormArea" @close="closeAdd">
      <el-form :model="addForm" class="addForm">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="摘要" :label-width="formLabelWidth">
          <el-input v-model="addForm.description" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="关键字" :label-width="formLabelWidth">
          <el-input v-model="addForm.keywords" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSure">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改数据 -->
    <el-dialog name="修改数据" :visible.sync="modifyFormVisible" class="addArea" modal custom-class="addFormArea">
      <el-form :model="modifyForm" class="addForm">

        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="modifyForm.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="简述" :label-width="formLabelWidth">
          <el-input v-model="modifyForm.description" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input v-model="modifyForm.keywords" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifySure">确 定</el-button>
      </div>
    </el-dialog>

    <el-button type="primary" class="addBtn" @click="add" icon="el-icon-plus">添加</el-button>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Category',
  data: function () {
    return {
      title: 'Category list',
      tableData: [],
      addFormVisible: false,
      modifyFormVisible: false,
      modifyId: '',
      modifyRow: '',
      value: '',
      addForm: {
        name: '',
        description: '',
        keywords: ''
      },
      modifyForm: {
        _id: '',
        name: '',
        description: '',
        keywords: ''
      },
      formLabelWidth: '100px',
      loading: false
    }
  },
  methods: {
    //  获取分类 _id name 放置下拉数据
    getCategories: function () {
      var that = this
      that.loading = true
      axios.post('/category/query').then(
        function (response) {
          console.log(response)
          that.loading = false
          // Object.assign(this.modifyForm, row)
          var optionsArr = response.data.responese.categorys
          var optionsArrId = optionsArr.filter(optionsArr => optionsArr._id !== '')
          var optionsArrName = optionsArr.filter(optionsArr => optionsArr.name !== '')
          that.options = Object.assign(optionsArrId, optionsArrName)
          // console.log(that.options)
        },
        function () {
          that.loading = false
          console.log('error')
        }
      )
    },

    //  获取全部数据
    getAll: function () {
      var that = this
      that.loading = true

      axios.post('/category/query').then(
        function (response) {
          that.loading = false
          that.tableData = response.data.responese
        },
        function () {
          that.loading = false
          console.log('error')
        }
      )
    },
    add: function () {
      this.addFormVisible = true
    },
    addSure: function () {
      var that = this
      this.addFormVisible = false
      // 调新增接口,在回调函数中刷新一次
      var addObj = {parameters: this.addForm}
      axios.post('/category/create', addObj).then(
        function (response) {
          if (response.status === 200) {
            that.$message({
              message: '添加成功',
              type: 'success',
              onClose: function () {
                that.getAll()
              }
            })
          }
        },
        function () {
          //  this.loading = false;
        }
      )
    },
    //  关闭dialog的函数
    closeAdd: function () {
      this.addForm.name = ''
      this.addForm.description = ''
      this.addForm.keywords = ''
    },
    // 修改操作
    modify: function (row) {
      this.modifyRow = row
      this.modifyFormVisible = true
      this.modifyForm = Object.assign(this.modifyForm, row)
      this.modifyObj = {parameters: this.modifyForm}
    },
    modifySure: function () {
      var that = this
      // var modifyPostObjArr = {}
      var modifyPostObj = {parameters: {}}
      // modifyPostObjArr.category = this.modifyRow['category']['_id']
      // modifyPostObj.parameters = Object.assign(this.modifyForm, modifyPostObjArr)
      modifyPostObj.parameters = this.modifyForm
      axios.post('/category/update', modifyPostObj).then(
        function (response) {
          if (response.status === 200) {
            that.modifyFormVisible = false
            that.$message({
              message: '修改成功',
              type: 'success',
              onClose: function () {
                that.getAll()
              }
            })
          }
        },
        function () {
          that.loading = false
          that.$message({
            message: '修改失败',
            type: 'error'
          })
        }
      )
    },
    //  删除操作
    deleteCategory: function (id) {
      var that = this
      var deleteId = id

      var param = {'id': deleteId}
      var thisDeleteObj = {parameters: param}

      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // thisDeleteObj.parameters.deleted = true
        axios.post('/category/remove', thisDeleteObj).then(
          function (response) {
            if (response.status === 200) {
              that.$message({
                type: 'success',
                message: '删除成功!',
                onClose: function () {
                  that.getAll()
                }
              })
            } else {
              that.$message({
                type: 'error',
                message: '删除失败!'
              })
            }
          },
          function () {
            //  this.loading = false;
          }
        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  // 页面初始化进来查询数据
  mounted: function () {
    this.getAll()
  }
}
</script>

<style lang="css">
  .tableHeader {
    color: #000;
  }
  div.category {
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
@import '~@/assets/stylesheet/pages/category.styl';
</style>
-->
