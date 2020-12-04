<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
          background-color="#F5F5F5"
          text-color="#000"
          :unique-opened="true"
          active-text-color="rgb(128, 30, 31)"
          :collapse-transition="false"
          mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>

import {mapGetters} from 'vuex';
import SidebarItem from "@/layout/components/Sidebar/SidebarItem";

export default {
  name: "Sidebar",
  components: {SidebarItem},
  computed: {
    ...mapGetters([
      'permission_routes'
    ])
  },
  created() {
    console.log(this.permission_routes);
  }
}
</script>

<style scoped>
</style>
