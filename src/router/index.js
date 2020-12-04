import router from '@/router/routers';
import config from '@/config/config';
import ro from "element-ui/src/locale/lang/ro";


// const whiteList = ['/login'];

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title + '-' + config.title;
    }
    console.log(ro);
    console.log(from);
    console.log(next);
});
