import {createRouter, createWebHistory, RouterOptions} from 'vue-router'
import HomeView from '../views/common/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
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
            // userId只匹配数字
            path: '/user/:userId(\\d+)',
            name: 'userInfo',
            component: () => import('../views/user/UserInfoView.vue')
        },
        {
            path: '/edit/userinfo',
            name: 'userinfoEdit',
            component: () => import('@/views/user/UserinfoEditView.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: () => import('../views/common/NotFoundView.vue')
        }
    ]
} as RouterOptions)

export default router
