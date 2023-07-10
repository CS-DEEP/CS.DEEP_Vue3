import {createRouter, createWebHistory, RouterOptions} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/user/LoginView.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/user/RegisterView.vue')
        },
        {
            path: '/resetPwd',
            name: 'resetPwd',
            component: () => import('../views/user/ResetPwdView.vue')
        },
        {
            path: '/userInfo',
            name: 'userInfo',
            component: () => import('../views/user/UserInfoView.vue')
        }
    ]
} as RouterOptions)

export default router
