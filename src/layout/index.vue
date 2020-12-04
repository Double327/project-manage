<template>
  <div class="app-wrapper">
    <Header></Header>
    <Sidebar class="sidebar-container"></Sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from "@/layout/components/Sidebar/index";
import Header from "@/components/Header";

export default {
  name: "Layout",
  components: {Header, Sidebar}
}
</script>

<style lang="scss" scoped>

</style>
