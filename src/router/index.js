import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
    {
        path:"/",
        redirect: '/specification'
    },
    {
        path:"/specification",
        component: () => import('@/views/specification/index')
    }
]

var router =  new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes
})
export default router;