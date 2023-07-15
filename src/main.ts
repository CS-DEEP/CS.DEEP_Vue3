import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store, {key} from "@/store";
import './assets/iconfont/iconfont.css'

const app = createApp(App)

app.use(router)

app.use(store, key)

// noinspection TypeScriptValidateTypes
app.use(ElementPlus)

app.mount('#app')
