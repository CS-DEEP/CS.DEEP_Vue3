import {createStore, Store,} from 'vuex'
import StateTypes from "@/store/interface";
import {InjectionKey} from "vue";
import createPersistedState from 'vuex-persistedstate';

export default createStore<StateTypes>({
    state: {
        userId: -1,
    },
    mutations: {
        updateUserId(state, id: number) {
            state.userId = id;
        }
    },
    plugins: [createPersistedState()]
})

export const key: InjectionKey<Store<StateTypes>> = Symbol('vue-store') as InjectionKey<Store<StateTypes>>;
