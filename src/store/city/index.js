// 存放状态
const state = {
        cn: window.localStorage.getItem('cityname') || '北京',
        cid: window.localStorage.getItem('cityid') || 110100
    }
    // 异步操作
const actions = {

    }
    // 成员操作
const mutations = {
    CITY_INFO(state, cload) {
        state.cn = cload.cn,
            state.cid = cload.cid
            //console.log(state.cn);
            // console.log(state.cid);
            // console.log(window.localStorage.getItem('cityid'));
            // console.log(window.localStorage.getItem('cityname'));
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}