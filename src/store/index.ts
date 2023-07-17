import {createStore, Store,} from 'vuex'
import StateTypes from "@/store/interface";
import {InjectionKey} from "vue";
import createPersistedState from 'vuex-persistedstate';
import CONST from '../global/const/index'
import {userType} from "@/type";

export default createStore<StateTypes>({
    state: {
        userinfo: CONST.DEFAULTUSERINFO,
        haveLogin: false
    },
    mutations: {
        updateUserinfo(state, info: userType) {
            state.userinfo = info;
        },
        updateLoginState(state) {
            state.haveLogin = !state.haveLogin;
        }
    },
    plugins: [createPersistedState()]
})

export const key: InjectionKey<Store<StateTypes>> = Symbol('vue-store') as InjectionKey<Store<StateTypes>>;
