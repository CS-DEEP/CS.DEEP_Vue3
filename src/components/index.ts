import SvgIcon from './SvgIcon/index.vue';
const allGlobalComponent = { SvgIcon }
export default {
    install(app) {
        Object.keys(allGlobalComponent).forEach(key => {
            app.component(key,allGlobalComponent[key]);
        })
    }
}