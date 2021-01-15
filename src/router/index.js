import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
        path: "/",
        redirect: '/login'
    },
    {
        path: "/login",
        component: () => import('@/views/skyblade/login')
    },
    {
        path: "/skyblade",
        component: () => import('@/views/skyblade/index'),
        meta:{requireAuth:true}
    },
    {
        path: "/create",
        component: () => import('@/views/skyblade/createinfo'),
        meta:{requireAuth:true}
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