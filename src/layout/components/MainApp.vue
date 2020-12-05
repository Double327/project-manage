<template>
  <section class="app-main">
    <router-view :key="key"></router-view>
  </section>
</template>

<script>
export default {
  name: "MainApp",
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>

</style>
