import Vue from 'vue'
import VueRouter from 'vue-router'
import cinemaReouter from './cinema'
import mineRouter from './mine'
import movieRouter from './movie'

Vue.use(VueRouter)

const routes = [
    cinemaReouter,
    mineRouter,
    movieRouter,
    {
        path: '/cinemas/:cinemaid',
        component: () =>
            import ('@/views/Cinema/cinema.vue')
    },
    {
        path: '/*',
        redirect: '/movie'
    },

]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router