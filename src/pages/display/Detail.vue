<template>
  <div class="detail">
    <el-button type="success" class="goback" icon="el-icon-arrow-left" @click="goback">返回上一页</el-button>
    <p class="articleName">{{title}}</p>
    <div>{{content}}</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'detail',
  data: function () {
    return {
      title: '',
      abstract: '',
      content: '',
      loading: false
    }
  },
  methods: {
    getMessage (id) {
      var that = this
      var thisOneObj = {parameters: {id}}
      axios.post('/content/one', thisOneObj).then(
        function (response) {
          that.loading = false
          that.title = response.data.responese.title
          that.abstract = response.data.responese.abstract
          that.content = response.data.responese.content
        },
        function () {
          that.loading = false
          console.log('error')
        }
      )
    },
    goback () {
      this.$router.go(-1)
    }
  },
  mounted: function () {
    this.getMessage(this.$route.params.title)
  }
}
</script>

<style scoped>
  .detail{
    width: 80%;
    margin: 50px auto;
  }
  .imgClass{
    width: 100%;
  }
  .articleName{
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    font-style: italic;
  }
  .goback{
    margin-bottom: 30px;
  }
</style>
