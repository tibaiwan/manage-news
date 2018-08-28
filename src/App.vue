<template>
  <div id="app">
    <h3 class="title">{{title}}</h3>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      title: 'cms link mongodb'
    }
  }
}
</script>

<style lang="stylus">
@import '~@/assets/stylesheet/common.styl';
</style>
