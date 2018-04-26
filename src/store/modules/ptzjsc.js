import * as types from '@/store/mutation-types'
import { apistore } from '@/config/api/api.store'
import ENV from '@/config/env/env.export'
export default{
  namespaced: true,
  state: {
    content: null,
    zjlbArr: [],
    // zjzy: {
    //   zjzyTitle: [],
    //   zjzyArr: [],
    //   zjzyIndex: 0,
    //   fxClicked: false,
    //   wtClicked: false
    // },
    // glqjList: [],
    glrList: [], // 未排序之前的关联人数组
    oneList: [], // 犯罪嫌疑人
    xyrIndex: '', // 嫌疑人当前下标
    twoList: [], // 被害人
    bhrIndex: '', // 被害人当前下标
    xcClicked: false,
    ffClicked: false, // 非法或瑕疵证据图标的显隐
    glrModal: {
      state: '',
      tar: ''
    },
    fzss: { // 犯罪事实
      fzssArr: null,
      index: 0,
      zyArr: null,
      zyIndex: 0
    },
    mzArr: [],
    whcdArr: [],
    delglss: false, // 默认不删除关联事实
    lxqj: { // 量刑情节
      lxqjArr: null,
      lxqjtreeData: []
    },
    evidGuide: [], // 证据指引数据
    offsetTabs: 0,
    materialTipShow: false, // 材料组合成程序性证据的提示
    clglrselected: [], // 默认材料关联人
    fzclData: [], // 分组材料数据
    zjzyBtzth: '', // 证据指引通过状态， 全部、部分、全未等别为0,1,2
    reviewEvidence: '', // 证据指引图片数据
    zjzyImgUrl: '', // 证据指引图片地址
    showTJTS: true, // 推荐提示的链接的显隐
    ajscGroupState: true, // 当前为组合材料审查
    evidExpand: false, // 证据指引是否展开
    singelMaterial: false, // 是否为单个证据材料
    fzedData: null, // 分组数据，用于取图片的数据来源
    imgGroupData: {
      imgStart: 0,
      size: 5,
      maxMun: '',
      data: [],
      total: '',
      pagedNum: 0 // 翻页次数
    },
    zymb: null,
    zjfzxx: {},
    fzzhState: {
      fzzhIndex: 0,
      fzzhShow: false,
      tpIndex: 0
    },
    qjglrIndex: [], // 关联情节下标
    crimeMcArr: [],
    linkTree: false
  },
  getters: {
    precode: state => state.oldcode ? state.oldcode : '--------'
  },
  mutations: {
    [types.UPDATE_PTZJSCCLINFO] (state, obj) {
      state.content = obj
    },
    [types.UPDATE_PTFZSS] (state, obj) {
      state.fzss = obj
    },
    [types.UPDATE_PTZJLB] (state, obj) {
      state.zjlbArr = obj
    },
    [types.UPDATE_PTMZSELECTED] (state, value) {
      state.glrForm.minzu.selected = value
    },
    [types.UPDATE_PTWHCDSELECTED] (state, value) {
      state.glrForm.whcd.selected = value
    },
    [types.UPDATE_PTGLRMODAL] (state, obj) {
      state.glrModal = obj
    },
    [types.UPDATE_PTXYRINDEX] (state, obj) {
      state.xyrIndex = obj
    },
    [types.UPDATE_PTBHRINDEX] (state, obj) {
      state.bhrIndex = obj
    },
    [types.SET_QJGLRINDEX] (state, value) {
      state.qjglrIndex = value
    },
    [types.UPDATEPTZJSCCLGLR] (state, obj) {
      state.clglrselected = obj
    },
    [types.UPDATEFZCLDATA] (state, obj) {
      state.fzclData = obj
    },
    [types.UPDATEFZCLNRXS] (state, value) {
      state.materialTipShow = value
    },
    [types.UPDATESHOWTJTS] (state, value) {
      state.showTJTS = value
    },
    [types.UPDATEEVIDEXPAND] (state, value) {
      state.evidExpand = value
    },
    [types.UPDATE_SINGELMATERIAL]  (state, data) {
      state.singelMaterial = data
    },
    [types.UPDATE_FZZHSTATE]  (state, data) {
      state.fzzhState = data
    },
    [types.UPDATE_ZJFZXX]  (state, obj) {
      state.zjfzxx = obj
    },
    [types.UPDATE_IMGGROUPDATA]  (state, obj) {
      state.imgGroupData = obj
    },
    [types.UPDATE_CLGROUPLIST]  (state, obj) {
      state.imgGroupData = obj
    },
    [types.UPDATE_LINKTREE]  (state, value) {
      state.linkTree = value
    }
  },
  actions: {
    async initContent ({ state, commit, rootState }) {
      if (rootState.curNode && rootState.curNode.ajzjclfy) {
        let data = await apistore.ptzjsc.initContent(rootState.curNode.ajzjclfy, rootState.ajxxbh)
        commit(types.UPDATE_PTZJSCCLINFO, data)
      }
    },
    async getzjlb ({ state, commit }) {
      let node = await apistore.ptzjsc.getzjlb()
      commit(types.UPDATE_PTZJLB, node)
    },
    updatezjlb ({ state, commit }, arg) {
      return apistore.ptzjsc.updatezjlb(arg.bh, arg.zjlbbh)
    },
    async getsazmArr ({ dispatch, state, commit, rootState }) {
      state.crimeMcArr = []
      let data = await apistore.ptzjsc.getsazmArr()
      state.crimeMcArr = data
    },
    async getzymbInfo ({ state, commit, rootState }, arg) {
      let data = await apistore.ptzjsc.getzymbInfo(rootState.curNode.zjclbh, arg)
      state.zymb = data
    },
    async fzgetzymbInfo ({ state, commit, rootState }, arg) {
      let data = await apistore.ptzjsc.fzgetzymbInfo(state.zjfzxx.zjclzhmbbh, arg.aydm)
      state.zymb = data
    },
    updatezjclmc ({ state, commit }, arg) {
      return apistore.ptzjsc.updatezjclmc(arg)
    },
    async editzjzy ({ state, commit }, arg) {
      await apistore.ptzjsc.editzjzy(arg)
      if (arg.zjwt) {
        state.zjObj.xcedit = false
      } else if (arg.zjfx) {
        state.zjObj.ffedit = false
      }
    },
    async jygetzjzy ({ state, commit, rootState }) {
      let data = await apistore.ptzjsc.jygetzjzy(rootState.curNode.zjclbh)
      commit('UPDATE_JYZJZY', data)
    },
    getGlr ({ dispatch, state, commit, rootState }) {
      if (rootState.curNode && rootState.curNode.ajzjclbh) {
        return apistore.ptzjsc.getGlr(rootState.curNode.ajzjclbh, rootState.ajxxbh)
      }
    },
    async getfzGlr ({ dispatch, state, commit, rootState }, arg) {
      let obj = {}
      obj.ajxxbh = rootState.ajxxbh
      obj.zjfzbh = arg
      let data = await apistore.ptzjsc.getfzGlr(obj)
      dispatch('dealGlr', data)
    },
    dealGlr ({ state }, data) {
      state.glrList = data
      let arr1 = state.glrList.filter(o => o.js === '1')
      state.oneList = arr1
      let arr2 = state.glrList.filter(o => o.js === '2')
      state.twoList = arr2
    },
    updatexyrArr ({ state }) { // 重组嫌疑人数组
      let arr1 = state.glrList.filter(o => o.js === '1')
      state.oneList = arr1
    },
    updatebhrArr ({ state }) { // 重组被害人数组
      let arr1 = state.glrList.filter(o => o.js === '2')
      state.twoList = arr1
    },
    async getMz ({ state }) {
      let data = await apistore.ptzjsc.getMz()
      state.mzArr = data
    },
    async getWhcd ({ state }) {
      let data = await apistore.ptzjsc.getWhcd()
      state.whcdArr = data
    },
    initGlrModal ({ state }, arg) {
      if (state.glrModal.state === 'edit') {
        if (arg.sarymc) {
          state.glrForm.name = arg.sarymc
        }
        if (arg.xb) {
          for (let i = 0; i < state.glrForm.sex.arr.length; i++) {
            if (state.glrForm.sex.arr[i] === arg.xb) {
              state.glrForm.sex.curIndex = i
            }
          }
        }
        if (arg.mz) {
          state.glrForm.minzu.selected = arg.mz
        }
        if (arg.whcd) {
          state.glrForm.whcd.selected = arg.whcd
        }
        if (arg.csrq) {
          state.glrForm.birth = arg.csrq
        }
        if (arg.jzd) {
          state.glrForm.address = arg.jzd
        }
        if (arg.sfzhm) {
          state.glrForm.number = arg.sfzhm
        }
      } else {
        state.glrForm.birth = ''
        state.glrForm.name = ''
        state.glrForm.number = ''
        state.glrForm.grade = ''
        state.glrForm.address = ''
        state.glrForm.minzu.selected = '--请选择--'
        state.glrForm.whcd.selected = '--请选择--'
        state.glrForm.sex.curIndex = ''
      }
    },
    async glrEnsure ({ dispatch, state, commit, rootState }, arg) {
      let data = {}
      data.bmsah = rootState.bmsah
      data.ajxxbh = rootState.ajxxbh
      data.ajzjclbh = rootState.curNode.ajzjclfy
      data.addFzss = false
      data.sarymc = arg.sarymc
      if (!arg.xb) {
      } else {
        data.xb = arg.xb
      }
      data.mz = arg.mz
      data.csrq = arg.csrq
      data.sfzhm = arg.sfzhm
      data.whcd = arg.whcd
      data.jzd = arg.jzd
      data.js = arg.js
      if (state.glrModal.state === 'add') {
        await apistore.ptzjsc.addglr(data)
        dispatch('getGlr')
      } else {
        data.sarybh = arg.sarybh
        await apistore.ptzjsc.editglr(data)
        dispatch('getGlr')
      }
    },
    async glrCheck ({ dispatch, state, commit, rootState }, arg) {
      arg.ajzjclbh = rootState.curNode.ajzjclbh
      await apistore.ptzjsc.glrCheck(arg)
    },
    async fzglrCheck ({ dispatch, state, commit, rootState }, arg) {
      arg.ajxxbh = rootState.ajxxbh
      await apistore.ptzjsc.fzglrCheck(arg)
    },
    async glrCancelCheck ({ dispatch, state, commit, rootState }, arg) {
      arg.ajzjclbh = rootState.curNode.ajzjclbh
      await apistore.ptzjsc.glrCancelCheck(arg)
    },
    async fzglrCancelCheck ({ dispatch, state, commit, rootState }, arg) {
      arg.zjfzbh = state.zjfzxx.zjfzbh
      await apistore.ptzjsc.fzglrCancelCheck(arg)
    },
    updateOneList ({ dispatch, state }, arg) {
      state.oneList[arg.index].selected = arg.state
      dispatch('updatexyrArr')
    },
    updateTwoList ({ dispatch, state }, arg) {
      state.twoList[arg.index].selected = arg.state
      dispatch('updatebhrArr')
    },
    async delPeople ({ dispatch, state, commit, rootState }, arg) {
      arg.bmsah = rootState.bmsah
      arg.ajxxbh = rootState.ajxxbh
      await apistore.ptzjsc.delPeople(arg, state.delglss)
      dispatch('getGlr')
    },
    async getglss ({ dispatch, state, rootState }) {
      state.fzss.zyArr = []
      if (rootState.curNode && rootState.curNode.ajzjclbh) {
        let data = await apistore.ptzjsc.getglss(rootState.curNode.ajzjclbh, rootState.ajxxbh)
        state.fzss.fzssArr = data
        let arr = state.fzss.fzssArr.filter(o => o.selected)
        if (arr.length > 0) {
          state.fzss.zyArr = arr
          state.fzss.zyIndex = 0
        } else {
          state.fzss.zyArr = []
          state.fzss.zyIndex = ''
        }
      }
    },
    async getfzglss ({ dispatch, state, rootState }, arg) {
      let obj = {}
      obj.ajxxbh = rootState.ajxxbh
      obj.zjfzbh = arg
      state.fzss.zyArr = []
      let data = await apistore.ptzjsc.getfzglss(obj)
      state.fzss.fzssArr = data
      let arr = state.fzss.fzssArr.filter(o => o.selected)
      if (arr.length > 0) {
        state.fzss.zyArr = arr
        state.fzss.zyIndex = 0
      } else {
        state.fzss.zyArr = []
        state.fzss.zyIndex = ''
      }
    },
    ptdelfzss ({ dispatch, state, commit, rootState }, arg) {
      apistore.ptzjsc.ptdelfzss(arg).then(res => {
        if (state.singelMaterial) {
          dispatch('getglss')
        } else {
          dispatch('getfzglss', state.zjfzxx.zjfzbh)
        }
      })
    },
    ptaddfzss ({ dispatch, state, commit, rootState }, arg) {
      arg.ajxxbh = rootState.ajxxbh
      apistore.ptzjsc.ptaddfzss(arg).then(res => {
        if (state.singelMaterial) {
          dispatch('getglss')
        } else {
          dispatch('getfzglss', state.zjfzxx.zjfzbh)
        }
      })
    },
    async ptEditfzss ({ dispatch, state, commit, rootState }, arg) {
      await apistore.ptzjsc.ptEditfzss(arg).then(res => {
        if (state.singelMaterial) {
          dispatch('getglss')
        } else {
          dispatch('getfzglss', state.zjfzxx.zjfzbh)
        }
      })
    },
    async chooseFzss ({ dispatch, state, commit, rootState }, arg) {
      arg.ajzjclbh = rootState.curNode.ajzjclbh
      arg.ajxxbh = rootState.ajxxbh
      await apistore.ptzjsc.chooseFzss(arg)
    },
    async fzchooseFzss ({ dispatch, state, commit, rootState }, arg) {
      arg.zjfzbh = state.zjfzxx.zjfzbh
      arg.ajxxbh = rootState.ajxxbh
      await apistore.ptzjsc.fzchooseFzss(arg)
    },
    async cancelFzss ({ dispatch, state, commit, rootState }, arg) {
      await apistore.ptzjsc.cancelFzss(rootState.curNode.ajzjclbh, arg).then(res => {
        dispatch('getglss')
      })
    },
    async fzcancelFzss ({ dispatch, state, commit, rootState }, arg) {
      arg.zjfzbh = state.zjfzxx.zjfzbh
      await apistore.ptzjsc.fzcancelFzss(arg).then(res => {
        dispatch('getfzglss', state.zjfzxx.zjfzbh)
      })
    },
    updatescglss ({ state }) {
      state.delglss = !state.delglss
    },
    findfzss ({ dispatch, state, rootState }, arg) {
      arg.ajxxbh = rootState.ajxxbh
      return apistore.ptzjsc.findfzss(arg)
    },
    async addfzss ({ dispatch, state, rootState }, arg) {
      for (let i = 0; i < arg.length; i++) {
        arg[i].ajxxbh = rootState.ajxxbh
        arg[i].ajzjclbh = rootState.curNode.ajzjclfy
      }
      await apistore.ptzjsc.addfzss(arg)
      dispatch('getglss')
    },
    async editFzss ({ dispatch, state, rootState }, arg) {
      await apistore.ptzjsc.editFzss(arg)
      dispatch('getglss')
    },
    async deleteFzss ({ dispatch, state, rootState }, arg) {
      arg.ajxxbh = rootState.ajxxbh
      arg.bmsah = rootState.bmsah
      await apistore.ptzjsc.deleteFzss(arg)
      dispatch('getglss')
    },
    async checkFzss ({ dispatch, state, rootState }, arg) {
      await apistore.ptzjsc.checkFzss(arg)
    },
    // async getzjscxx ({ state, rootState }) {
    //   let data = await apistore.ptzjsc.getzjscxx({ajxxbh: rootState.ajxxbh, bmsah: rootState.bmsah, ajzjclbh: rootState.curNode.ajzjclfy})
    //   state.zjzy.zjzyArr = data
    // },
    async getlxqjTree ({ state }) {
      let data = await apistore.ptzjsc.getlxqjTree()
      state.lxqj.lxqjArr = data
    },
    async editzjscxx ({ state, rootState }, arg) {
      arg.ajxxbh = rootState.ajxxbh
      arg.ajzjclbh = rootState.curNode.ajzjclbh
      await apistore.ptzjsc.editzjscxx(arg)
    },
    async fzeditzjscxx ({ state, rootState }, arg) {
      arg.ajxxbh = rootState.ajxxbh
      arg.zjfzbh = state.zjfzxx.zjfzbh
      await apistore.ptzjsc.fzeditzjscxx(arg)
    },
    // async getClState ({ dispatch, commit, state, rootState }, arg) {
    //   if (arg) {
    //     state.fzzhState.tpIndex = 0
    //     state.fzzhState.fzzhIndex = 0
    //   }
    //   state.fzzhState.fzzhShow = false
    //   state.zjfzxx = {}
    //   if (rootState.curNode && rootState.curNode.ajzjclbh) {
    //     let data = await apistore.pdfs.getfzclData(rootState.ajxxbh, rootState.curNode.ajzjclbh)
    //     let list = []
    //     for (let i = 0; i < data.length; i++) {
    //       // debugger
    //       if (data[i].selected) {
    //         list.push(data[i])
    //         state.fzzhState.fzzhIndex = i
    //         state.zjfzxx.zjfzbh = data[i].zjfzbh
    //         break
    //       }
    //     }
    //     if (list.length > 0) { // 组合材料
    //       state.zjfzxx = list[0]
    //       if (arg) {
    //         state.imgGroupData.imgStart = 0
    //         state.imgGroupData.pagedNum = 0
    //       }
    //       commit(types.UPDATE_SINGELMATERIAL, false)
    //       if (arg) {
    //         dispatch('getFztp', state.zjfzxx.zjfzbh)
    //       } else {
    //         dispatch('getFztpnpp', {zjfzbh: state.zjfzxx.zjfzbh, rt: arg})
    //       }
    //       dispatch('getfzGlr', state.zjfzxx.zjfzbh)
    //       dispatch('getfzglss', state.zjfzxx.zjfzbh)
    //     } else { // 单份材料
    //       commit(types.UPDATE_SINGELMATERIAL, true)
    //       dispatch('getGlr').then(res => {
    //         dispatch('dealGlr', res.data)
    //         dispatch('fzcltj')
    //       })
    //       dispatch('getglss')
    //       dispatch('initContent')
    //     }
    //   }
    // },
    getClState ({ dispatch, commit, state, rootState }, arg) {
      // state.fzzhState.tpIndex = 0
      state.fzzhState.fzzhIndex = 0
      state.fzzhState.fzzhShow = false
      state.zjfzxx = {}
      if (rootState.curNode && rootState.curNode.ajzjclbh) {
        return apistore.ptzjsc.getfzclData(rootState.ajxxbh, rootState.curNode.ajzjclbh)
      }
    },
    getFztp ({ dispatch, state, rootState }, arg) {
      // state.fzzhState.tpIndex = 0
      return apistore.ptzjsc.getFztp(rootState.ajxxbh, arg, 0, 0)
      // state.imgGroupData.data = data.list
      // state.imgGroupData.total = data.count
    },
    async getFztpnpp ({ dispatch, state, rootState }, arg) {
      let data = await apistore.ptzjsc.getFztp(rootState.ajxxbh, arg.zjfzbh, 0, 0)
      state.imgGroupData.data = data.list
      state.imgGroupData.total = data.count
    },
    async getFztpnew ({ dispatch, state, rootState }, arg) {
      return apistore.ptzjsc.getFztpnew(rootState.ajxxbh, arg, state.imgGroupData.imgStart, state.imgGroupData.imgStart + state.imgGroupData.size - 1)
    },
    delcltp ({ dispatch, state, rootState }, arg) {
      state.imgGroupData.imgStart = 0
      state.imgGroupData.pagedNum = 0
      return apistore.ptzjsc.delcltp(arg.ajzjclbh, arg.zjfzbh)
    },
    async fzcltj ({ dispatch, state, rootState }) {
      // debugger
      if (rootState.curNode && rootState.curNode.ajzjclbh) {
        let data = await apistore.ptzjsc.fzcltj(rootState.ajxxbh, rootState.curNode.ajzjclbh)
        if (data && data.length > 0) {
          state.materialTipShow = true
          state.showTJTS = true
          state.fzclData = data
          state.clglrselected = []
          for (let i = 0; i < state.fzclData.length; i++) {
            if (state.oneList.length > 0) {
              if (state.oneList.filter(o => o.selected).length > 0) {
                state.clglrselected.push(JSON.parse(JSON.stringify(state.oneList.filter(o => o.selected)[0])))
              } else {
                state.clglrselected.push(JSON.parse(JSON.stringify(state.oneList[0])))
              }
            } else {
              state.clglrselected.push({sarymc: '未知'})
            }
          }
        } else {
          state.materialTipShow = false
          state.showTJTS = false
        }
      }
    },
    fzclSave ({ dispatch, state, rootState }, arg) {
      return apistore.ptzjsc.fzclSave(arg)
    },
    async getZjzy ({ dispatch, state, rootState }) {
      if (rootState.curNode && rootState.curNode.ajzjclbh && rootState.ajxxbh) {
        let data = await apistore.ptzjsc.getZjzy(rootState.ajxxbh, rootState.curNode.zjclbh, rootState.curNode.ajzjclbh)
        if (!data.ZjscyzjgList || data.ZjscyzjgList.length <= 0) {
          state.evidGuide = []
          state.zjzyBtzth = 0
        } else {
          state.evidGuide = data.ZjscyzjgList
          state.zjzyBtzth = data.sftg
        }
      }
    },
    async editZjzy ({ dispatch, state, rootState }, arg) {
      arg.ajxxbh = rootState.ajxxbh
      arg.ajzjclbh = rootState.curNode.ajzjclbh
      arg.zjclbh = rootState.curNode.zjclbh
      await apistore.ptzjsc.editZjzy(arg)
      dispatch('getZjzy')
    },
    async getimg ({ dispatch, state, rootState }) { // 证据指引处的图片
      let data = await apistore.ptzjsc.getimg(rootState.curNode.zjclbh)
      state.reviewEvidence = data
      if (state.reviewEvidence) {
        state.zjzyImgUrl = `${ENV.REMOTE_ADDR}${state.reviewEvidence}`
      }
    }
    // changezynr ({ dispatch, state, rootState }, arg) {
    //   state.fzss.zyArr[state.fzss.zyIndex].zynr = arg
    // }
  }
}
