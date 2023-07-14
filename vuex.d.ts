import {ComponentCustomProperties} from "vue";
import StateTypes from "@/store/interface";
import {Store} from "vuex";


// 模块扩展
declare module '@vue/runtime-core' {
    // 为 `this.$store` 提供类型声明
    interface ComponentCustomProperties {
        $store: Store<StateTypes>
    }
}
