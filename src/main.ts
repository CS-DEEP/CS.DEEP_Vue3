import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import store, { key } from "@/store";
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import '@/assets/iconfont.css';


const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router)

app.use(store, key)

// noinspection TypeScriptValidateTypes
app.use(ElementPlus);

import 'virtual:svg-icons-register'

app.use(mavonEditor)

app.mount('#app')
