import {Router} from "vue-router";
import {Store} from "vuex";
import StateTypes from "@/store/interface";

export const createRouteGuards = (route: Router, store: Store<StateTypes>) => {
    route.beforeEach(async (to, from, next) => {
        // 登录校验
        if (!to.meta.verifyLoginState) {
            next()
        } else {
            if (to.path === '/login' || to.path === '/register' || to.path === '/resetPwd' || store.state.haveLogin) {
                next()
            } else {
                next({path: '/login'})
            }
        }
    })
}
