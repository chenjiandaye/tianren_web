import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
        path: "/",
        redirect: '/specification'
    },
    {
        path: "/specification",
        component: () => import('@/views/specification/index')
    },
    {
        path: "/create",
        component: () => import('@/views/specification/createinfo')
    }
]

var router = new VueRouter({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        return {
            y: 0
        }
    },
    routes
})
export default router;