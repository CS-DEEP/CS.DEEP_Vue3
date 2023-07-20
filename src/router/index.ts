import {createRouter, createWebHistory, RouterOptions} from 'vue-router'
import HomeView from '../views/common/HomeView.vue'
import {createRouteGuards} from "@/router/createRouteGuards";
import store from "@/store";

declare module 'vue-router' {
    interface RouteMeta {
        verifyLoginState: boolean
    }
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                verifyLoginState: false
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/user/LoginView.vue'),
            meta: {
                verifyLoginState: true
            }
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/user/RegisterView.vue'),
            meta: {
                verifyLoginState: true
            }
        },
        {
            path: '/resetPwd',
            name: 'resetPwd',
            component: () => import('../views/user/ResetPwdView.vue'),
            meta: {
                verifyLoginState: true
            }
        },
        {
            // userId只匹配数字
            path: '/user/:userId(\\d+)',
            name: 'userInfo',
            component: () => import('../views/user/UserInfoView.vue'),
            meta: {
                verifyLoginState: true
            }
        },
        {
            path: '/edit/userinfo',
            name: 'userinfoEdit',
            component: () => import('@/views/user/UserinfoEditView.vue'),
            meta: {
                verifyLoginState: true
            }
        },
        {
            path: '/show/:userId(\\d+)',
            name: 'show',
            component: () => import('@/views/user/UserDetailView.vue'),
            redirect: '/show/:userId(\\d+)/followings',
            children: [
                {
                    path: 'followings',
                    name: 'following',
                    component: () => import('@/views/user/details/MyFollowingView.vue'),
                    meta: {
                        verifyLoginState: true
                    }
                },
                {
                    path: 'followers',
                    name: 'follower',
                    component: () => import('@/views/user/details/MyFollowerView.vue'),
                    meta: {
                        verifyLoginState: true
                    }
                },
                {
                    path: 'messages',
                    name: 'message',
                    component: () => import('@/views/user/details/MyMessageView.vue'),
                    meta: {
                        verifyLoginState: true
                    }
                },
                {
                    path: 'drafts',
                    name: 'draft',
                    component: () => import('@/views/user/details/MyDraftView.vue'),
                    meta: {
                        verifyLoginState: true
                    }
                },
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: () => import('../views/common/NotFoundView.vue'),
            meta: {
                verifyLoginState: false
            }
        }
    ]
} as RouterOptions)

createRouteGuards(router, store)
export default router
