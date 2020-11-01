import Vue from 'vue'
import Vuex from 'vuex'
import city from './city/index'

Vue.use(Vuex)

export default new Vuex.Store({
    // 存放状态
    state: {},
    // 成员操作
    mutations: {},
    // 异步操作
    actions: {},
    // 模块化状态管理
    modules: {
        city
    }
})