<template>
  <section>
    <header-bar></header-bar>
    <section class="container">
      <router-view/>
    </section>
  </section>
</template>

<script>
import HeaderBar from './Header'

export default {
  name: 'homepage',
  components: {
    HeaderBar
  }
}
</script>
