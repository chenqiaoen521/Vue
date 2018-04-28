import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as types from '@/store/mutation-types'
import demo from './modules/demo'
import pdf from './modules/pdf'
import ptzjsc from './modules/ptzjsc'
import socketDemo from './modules/socket_io_demo'
import creatLogger from 'vuex/dist/logger'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export function createStore () {
  return new Vuex.Store({
    modules: {
      demo,
      socketDemo,
      pdf,
      ptzjsc // 普通模式的证据审查
    },
    plugins: debug ? [creatLogger(), createPersistedState()] : [createPersistedState()],
    state: {
      // bmsah: '山东省院起诉受[2018]37000000003号',
      bmsah: '山东省院起诉受[2017]37000000095号',
      ajxxbh: 'C6AEBCE78CDE4B3AB13967AEA3A40A1C',
      // ajxxbh: '0e6b11c58eb341d89b9b4f7c58b61581',
      lcjdbh: '005',
      model: 3,
      dwbm: '370000',
      pdfUrl: '',
      leftPdfUrl: '',
      rightPdfUrl: '',
      leftCurNode: null,
      rightCurNode: null,
      curNode: null
    },
    mutations: {
      [types.UPDATE_CURNODE]  (state, data) {
        state.curNode = data
      },
      [types.UPDATE_PDFURL]  (state, data) {
        state.pdfUrl = data
      },
      [types.SET_BMSAH] (state, bmsah) {
        state.bmsah = bmsah
      },
      [types.SET_AJXXBH] (state, ajxxbh) {
        state.ajxxbh = ajxxbh
      },
      [types.SET_MODEL] (state, model) {
        state.model = model
      },
      [types.SET_DWBM] (state, dwbm) {
        state.dwbm = dwbm
      },
      [types.SET_LCJDBH] (state, lcjdbh) {
        state.lcjdbh = lcjdbh
      },
      [types.SET_LEFTPDFURL] (state, lcjdbh) {
        state.leftPdfUrl = lcjdbh
      },
      [types.SET_RIGHTPDFURL] (state, lcjdbh) {
        state.rightPdfUrl = lcjdbh
      },
      [types.SET_LEFTCURNODE] (state, lcjdbh) {
        state.leftCurNode = lcjdbh
      },
      [types.SET_RIGHTCURNODE] (state, lcjdbh) {
        state.rightCurNode = lcjdbh
      }
    }
  })
}
