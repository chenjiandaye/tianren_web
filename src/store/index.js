import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        bladeData: [],
        pageList: [],
        defaultImg: '',
        detailImg: '',
        detailDesc: '',
        keepAlives: 'skyblade'
    },
    getters: {
        KEEPALIVES(state) { //监听keepAlives
            return state.keepAlives
        }
    },
    mutations: {
        updateBladeData(state, data) {
            state.bladeData = data
        },
        updatePageList(state, data) {
            state.pageList = data
        },
        updateDefaultImg(state, data) {
            state.defaultImg = data
        },
        updateDetailImg(state, data) {
            state.detailImg = data
        },
        updateDetailDesc(state, data) {
            state.detailDesc = data.replace(/(\r\n|\n|\r)/gm, "<br>")
        },
        updateKeepAlives(state, data) {
            state.keepAlives = data
        },
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
        reducer(val) {
            return {
                // 只储存state中的bladeData
                bladeData: val.bladeData,
                defaultImg: val.defaultImg,
                detailImg: val.detailImg,
                detailDesc: val.detailDesc
            }
        }
    })]
})
export default store