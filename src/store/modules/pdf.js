import * as types from '@/store/mutation-types'
import { apistore } from '@/config/api/api.store'
import ENV from '@/config/env/env.export'
export default{
  namespaced: true,
  state: {
    isload: true,
    jztreeData: [],
    sliderArr: [],
    sliderIndex: 0,
    treeIndex: 0, // 当前显示的证据树
    zjTreeArr: [],
    treeMark: 0,
    showTextAreaContent: null,
    preArrow: false, // pdf翻页箭头显示
    nextArrow: true, // pdf翻页箭头显示
    forbidPage: false,
    groupTreeData: [],
    clGroupData: [], // 分组材料数据
    showclfzData: false, // 分组弹框显示
    clState: [],
    clStateInfo: [],
    isCutPicture: false, // 截图框的显示
    clztIndex: '',
    qjData: [],
    jtbzlx: null,
    expandfznode: [],
    expandflnode: [],
    expandysnode: [],
    selectjznode: [],
    dqayData: [],
    pzlx: []
  },
  mutations: {
    SET_ISLOAD (state, data) {
      state.isload = data
    },
    [types.UPDATE_JZTREEDATA] (state, data) {
      state.jztreeData = data
    },
    [types.UPDATE_ZJTREEDATA] (state, data) {
      state.zjTreeArr = data
    },
    [types.UPDATE_SLIDERARR]  (state, data) {
      state.sliderArr = data
    },
    [types.UPDATE_GROUPTREE]  (state, data) {
      state.groupTreeData = data
    },
    [types.UPDATE_SLIDERINDEX]  (state, data) {
      state.sliderIndex = data
    },
    [types.UPDATE_TREEINDEX]  (state, data) {
      state.treeIndex = data
    },
    [types.UPDATE_TREEMARK]  (state, data) {
      state.treeMark = data
    },
    [types.UPDATE_SHOWTEXTAREACONTENT]  (state, data) {
      state.showTextAreaContent = data
    },
    [types.UPDATE_PREARROW]  (state, data) {
      state.preArrow = data
    },
    [types.UPDATE_NEXTARROW]  (state, data) {
      state.nextArrow = data
    },
    [types.UPDATE_CLGROUPDATA]  (state, data) {
      state.clGroupData = data
    },
    [types.UPDATE_SHOWCLFZDATA]  (state, value) {
      state.showclfzData = value
    },
    [types.UPDATE_ISCUTPICTURE]  (state, value) {
      state.isCutPicture = value
    },
    [types.UPDATE_CLZTINDEX]  (state, value) {
      state.clztIndex = value
    },
    [types.UPDATE_EXPANDFZNODE]  (state, obj) {
      state.expandfznode = obj
    },
    [types.UPDATE_EXPANDFLNODE]  (state, obj) {
      state.expandflnode = obj
    },
    [types.UPDATE_EXPANDYSNODE]  (state, obj) {
      state.expandysnode = obj
    },
    [types.UPDATE_FORBIDPAGE]  (state, value) {
      state.forbidPage = value
    }
  },
  actions: {
    async getSliderArr ({ state, commit, rootState }) {
      let data = await apistore.pdfs.getSliderArr(rootState.bmsah)
      let arr = [{
        mc: '原始卷宗',
        jmlbh: null
      }, {
        mc: '分类卷宗',
        jmlbh: null
      }, {
        mc: '分组卷宗',
        jmlbh: null
      }]
      // state.expandNode.flnode.push(data[0].id)
      commit(types.UPDATE_SLIDERARR, arr)
      commit(types.UPDATE_ZJTREEDATA, data)
    },
    refreshSliderArr ({ state, commit, rootState }) {
      if (rootState.bmsah) {
        return apistore.pdfs.refreshSliderArr(rootState.bmsah)
      }
      // commit(types.UPDATE_SLIDERARR, arr)
      // commit(types.UPDATE_ZJTREEDATA, data)
    },
    async getJzTreeData (item) {
      let { state, commit, rootState } = item
      rootState.pdfUrl = ''
      if (rootState.dwbm && rootState.bmsah) {
        let data = await apistore.pdfs.getJzTreeData(rootState.dwbm, rootState.bmsah)
        state.expandysnode.push(data[0].id)
        // this.$refs.jzTree.setCurrentKey(data[0].children[0].id)
        state.selectjznode.push(data[0].children[0].id)
        rootState.curNode = data[0].children[0]
        rootState.pdfUrl = `${ENV.PDF_ADDR}/static/pdfjs/web/viewer.html?file=${ENV.REMOTE_ADDR}/yjfz/dzjzym/${rootState.dwbm}/${rootState.bmsah}/${data[0].children[0].dzjzMlbh}/${data[0].children[0].dzjzWjbh}`
        commit(types.UPDATE_JZTREEDATA, data)
      }
    },
    async groupTree ({ state, commit, rootState }) {
      if (rootState.ajxxbh) {
        let data = await apistore.pdfs.groupTree(rootState.ajxxbh)
        state.groupTreeData = data
      }
      // state.expandNode.fznode.push(data[0].id)
      // commit(types.UPDATE_JZTREEDATA, data)
    },
    refreshTree ({ state, commit, rootState }) {
      if (rootState.ajxxbh) {
        return apistore.pdfs.refreshTree(rootState.ajxxbh)
      }
      // state.expandNode.fznode.push(data[0].id)
      // commit(types.UPDATE_JZTREEDATA, data)
    },
    async getJzLeafNodes ({ state, commit, rootState }, arg) {
      let data = await apistore.pdfs.getJzLeafNodes({zjlbbh: arg.zjlbbh, jmlbh: arg.jmlbh, bmsah: rootState.bmsah})
      return data.data
    },
    // 证据文本
    async zjwbNode ({ state, commit, rootState }) {
      let data = await apistore.pdfs.zjwbNode({bmsah: rootState.bmsah, dzjzmlbh: rootState.curNode.dzjzMlbh, dzjzwjbh: rootState.curNode.dzjzWjbh})
      commit(types.UPDATE_SHOWTEXTAREACONTENT, data)
    },
    // 识别
    async shibie ({ state, commit, rootState }) {
      let data = await apistore.pdfs.shibie({bmsah: rootState.bmsah, mlbh: rootState.curNode.dzjzMlbh, wjxh: rootState.curNode.dzjzWjbh})
      var data1 = JSON.parse(data.zb)
      document.getElementById('pdfjs').contentWindow.setLine(data1.data, data.width, data.height)
    },
    handleNode ({ state, commit, rootState }, arg) {
      let source = [] // 树数据来源
      let mark = '' // 节点匹配的字段
      let firstIndex = 0
      let secondIndex = 0
      let curNodeIndex = 0
      if (state.treeMark > 0 && state.treeMark < 2) { // 为证据树翻页
        source = state.zjTreeArr
        mark = 'id'
        for (let c = 0; c < source.length; c++) {
          if (arg.pparent.title === source[c].title) {
            firstIndex = c // 得到一级节点的下标
            break
          }
        }
        for (let s = 0; s < source[firstIndex].children.length; s++) { // 二级节点的下标
          if (arg.parent.data.id === source[firstIndex].children[s].id) {
            secondIndex = s
            break
          }
        }
        for (let v = 0; v < arg.parent.data.children.length; v++) { // 三级节点的下标
          if (arg[mark] === arg.parent.data.children[v][mark]) {
            curNodeIndex = v
            break
          }
        }
        if (firstIndex === source.length - 1 && secondIndex === source[firstIndex].children.length - 1 && curNodeIndex === arg.parent.children.length - 1) {
          commit(types.UPDATE_NEXTARROW, false)
        } else {
          commit(types.UPDATE_NEXTARROW, true)
        }
        if (firstIndex === 0 && secondIndex === 0 && curNodeIndex === 0) {
          commit(types.UPDATE_PREARROW, false)
        } else {
          commit(types.UPDATE_PREARROW, true)
        }
      } else {
        if (state.treeMark < 1) {
          source = state.jztreeData
        } else {
          source = state.groupTreeData
        }
        mark = 'id'
        let parent = arg.parent.data
        for (var j = 0; j < source.length; j++) {
          if (parent.id === source[j].id) {
            firstIndex = j // 得到一级节点的下标
          }
        }
        let nodes = parent.children
        for (var i = 0; i < nodes.length; i++) {
          if (nodes[i][mark] === arg.node[mark]) {
            curNodeIndex = i
          }
        }
        if (firstIndex === source.length - 1 && curNodeIndex === nodes.length - 1) {
          commit(types.UPDATE_NEXTARROW, false)
        } else {
          commit(types.UPDATE_NEXTARROW, true)
        }
        if (firstIndex === 0 && curNodeIndex === 0) {
          commit(types.UPDATE_PREARROW, false)
        } else {
          commit(types.UPDATE_PREARROW, true)
        }
      }
    },
    async getfzclData ({ state, commit, rootState }) {
      // debugger
      if (rootState.curNode && rootState.curNode.ajzjclbh && rootState.ajxxbh) {
        let data = await apistore.pdfs.getfzclData(rootState.ajxxbh, rootState.curNode.ajzjclbh)
        commit(types.UPDATE_SHOWCLFZDATA, false)
        commit(types.UPDATE_CLGROUPDATA, data)
      }
    },
    saveFz ({ state, commit, rootState }, arg) {
      return apistore.pdfs.saveFz(arg)
    },
    async saveeditfzmc ({ state, commit, rootState }, arg) {
      await apistore.pdfs.saveeditfzmc(arg.zjfzbh, rootState.ajxxbh, arg.zjfzmc)
    },
    clFzDel ({ state, commit, rootState }, arg) {
      return apistore.pdfs.clFzDel(arg)
    },
    clFzAdd ({ dispatch, state, commit, rootState }, arg) {
      // debugger
      arg.ajxxbh = rootState.ajxxbh
      return apistore.pdfs.clFzAdd(arg)
    },
    async getclStateInfo ({ state, commit, rootState }, arg) {
      // debugger
      if (rootState.curNode && rootState.curNode.ajzjclfy && rootState.ajxxbh) {
        let data = await apistore.pdfs.getclStateInfo(rootState.ajxxbh, rootState.curNode.ajzjclfy, arg, rootState.bmsah)
        if (arg <= 0) {
          state.clState = data
        } else {
          state.clStateInfo = data
        }
      }
    },
    async pdfCutImg ({ dispatch, state, commit, rootState }, arg) {
      arg.ajxxbh = rootState.ajxxbh
      arg.bmsah = rootState.bmsah
      arg.ajzjclfy = rootState.curNode.ajzjclfy
      await apistore.pdfs.pdfCutImg(arg)
      dispatch('getclStateInfo', 0)
    },
    async getQjData ({ state, commit, rootState }, arg) {
      let data = await apistore.pdfs.getQjData(arg)
      for (let item of data) {
        item.disabled = true
        for (let item2 of item.children) {
          item2.disabled = true
        }
      }
      state.qjData = data
    },
    // 获取当前案由
    async getAydmAndAymc ({ dispatch, state, commit, rootState }) {
      await apistore.pdfs.getAydmAndAymc(rootState.ajxxbh).then(res => {
        state.dqayData = res
        let obj = []
        dispatch('getQjData', obj)
      })
    },
    async getpzlx ({ state, commit, rootState }) {
      let data = await apistore.pdfs.getpzlx()
      state.pzlx = data
    },
    saveQj ({ dispatch, state, commit, rootState }, arg) {
      return apistore.pdfs.saveQj(arg)
    },
    async getjtbzlx ({ state, commit, rootState }) {
      let data = await apistore.pdfs.getjtbzlx()
      state.jtbzlx = data
    },
    getGlr ({ dispatch, state, commit, rootState }) {
      if (rootState.curNode && rootState.curNode.ajzjclfy) {
        return apistore.ptzjsc.getGlr(rootState.curNode.ajzjclbh, rootState.ajxxbh)
      }
    },
    getqjtp  ({ state, commit, rootState }, arg) {
      return apistore.pdfs.getqjtp(arg, rootState.bmsah)
    }
  }
}
