export default {
    path: '/movie',
    component: () =>
        import ('@/views/Movie'),
    children: [
        // 城市
        {
            path: 'city',
            component: () =>
                import ('@/components/City')
        },
        // 正在热映
        {
            path: 'nowPlaying',
            component: () =>
                import ('@/components/NowPlaying')
        },
        // 即将上映
        {
            path: 'comingSoon',
            component: () =>
                import ('@/components/ComingSoon')
        },
        // 搜索
        {
            path: 'search',
            component: () =>
                import ('@/components/Search')
        },
        {
            path: 'detail/:filmId',
            components: {
                // 跳转前默认路由
                default: () =>
                    import ('@/components/NowPlaying'),
                detail: () =>
                    import ('@/views/Movie/detail.vue')
            }
        },
        {
            path: '/movie',
            redirect: '/movie/nowPlaying'
        }
    ]
}