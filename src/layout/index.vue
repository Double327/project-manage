<template>
  <div class="app-wrapper">
    <Header></Header>
    <Sidebar class="sidebar-container"></Sidebar>
    <div class="main-container">
      <main-app></main-app>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/layout/components/Sidebar/index";
import Header from "@/components/Header";
import MainApp from "@/layout/components/MainApp";

export default {
  name: "Layout",
  components: {MainApp, Header, Sidebar}
}
</script>

<style lang="scss" scoped>

</style>
