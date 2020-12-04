import Vue from 'vue'
import App from './App.vue'
import '@/assets/style/global.scss';

/*引入 Element-UI*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
/*引入 Vue-Router*/
import VueRouter from 'vue-router';
/*引入Vuex*/
import Vuex from 'vuex';
/*引入路由*/
import routers from "@/router/routers";
import '@/router';

import store from "@/store";

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);


Vue.prototype.msgSuccess = function (msg) {
    this.$message({showClose: true, message: msg, type: "success"});
}

Vue.prototype.msgWarning = function (msg) {
    this.$message({showClose: true, message: msg, type: "warning"});
}

Vue.prototype.msgError = function (msg) {
    this.$message({showClose: true, message: msg, type: 'error'});
}

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    store,
    router: routers
}).$mount('#app')
