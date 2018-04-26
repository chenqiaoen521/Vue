<template>
  <div class="pdf">
    <div class="pdf-content">
      <pdfTitle ref="pdftitle" @showdzqz=showdzqz @cutPicture="cutPicture" @Move="Move" @viewFind="viewFind" @zoomOut="zoomOut" @zoomIn="zoomIn" 
        @pageRotateCw="pageRotateCw" @pageRotateCcw="pageRotateCcw" @scaleSelect="scaleSelect" @zjwbClick="zjwbClick"
        @shibie="shibie"></pdfTitle>
      <div class="left-content">
        
        <div class="mouseLeft" @mouseover="left" @mouseout="leftLeave">
        <transition name="pages-left">
          <span id="prePage" class="preBtn pBtn" v-show="preArrow && mouseLeft && !forbidPage" @click="prePage"></span>
        </transition>
        </div>
        <div class="mouseRight" @mouseover="right" @mouseout="rightLeave">
        <transition name="pages-right">
          <span id="nextPage" class="nextBtn pBtn" v-show="nextArrow && mouseRight && !forbidPage" @click="nextPage"></span>
        </transition>
        </div>
        
        <div class="pdfContent" :class="{isIllegal: illegal === true}">
          <div class="returnBtn_con" @click="returnClick" v-show="returnBtnShow">
            <span class="returnBtn"></span>
          </div>
          <div class="showTextArea" v-show="showTextArea">
            <pre>{{showTextAreaContent}}</pre>
          </div>
          <!-- <iframe
            v-show="!showTextArea"
            id="pdfjs"
            ref="pdfjs"
            :src= "pdfUrl"
            frameborder="0" style="width:100%;height:100%">
          </iframe> -->
          <div ref="pdfWrapper" class="pdf-wrapper">
            <img ref="pdfimg" src="../../../static/pdfs/test.jpg" alt="">
          </div>
          <div class="evidGuide" v-if="($route.query.type + '') !== '1'" :class="[{evidGuideFold: !evidExpand}, {'allPast': zjzyBtzth === 0 && ($route.query.type + '') === '3'},{'somePast': zjzyBtzth === 1 && ($route.query.type + '') === '3'},{'noPast': zjzyBtzth === 2 && ($route.query.type + '') === '3'}, {success: ($route.query.type + '') === '2'}]">
        </div>
        </div>
        <loading v-show="isload"></loading>
      </div>
      <transition name="sdzqz">
        <sliderTree v-show="sdzqz"></sliderTree>
      </transition>
    </div>
    <button id="changeModel" @click="changeModel" style="display: none"></button>
    <div v-show="TsDivShow" class="TsDiv"><img src="/static/images/caseCheck/chenggongicon.png">{{TsText}}</div>
    </div>
</template>
<script>
  import vuex from 'vuex'
  import pdfTitle from './pdfTitle.vue'
  import sliderTree from './sliderTree.vue'
  import loading from './loading'
  const pdf = vuex.createNamespacedHelpers('pdf')
  const ptzjsc = vuex.createNamespacedHelpers('ptzjsc')
  export default{
    name: 'pdfContent',
    computed: {
      ...pdf.mapState(['showTextAreaContent', 'treeMark', 'jztreeData', 'zjTreeArr', 'treeIndex', 'preArrow', 'nextArrow', 'groupTreeData', 'isCutPicture', 'forbidPage', 'isload']),
      ...ptzjsc.mapState(['zjzyBtzth', 'evidExpand', 'evidGuide']),
      ...vuex.mapState(['model', 'pdfUrl', 'curNode', 'bmsah', 'dwbm', 'ajxxbh'])
    },
    components: {pdfTitle, sliderTree, loading},
    data () {
      return {
        showTextArea: false,
        // showTextAreaContent: null,
        tabss: [
          {name: '卷宗'}
        ],
        sdzqz: false,
        returnBtnShow: false,
        hideSlider: false, // tree展开收起
        address: null, // pdf地址
        illegal: false,
        rightWidthHH: null,
        rWidth: null,
        headerHide: false,
        mouseLeft: null, // 鼠标移入左右翻页箭头
        mouseRight: null, // 鼠标移入左右翻页箭头
        // headerShow: false, // 头部 展开收起
        isMakeFile: false,
        curNodeIndex: null,
        secondIndex: null,
        firstIndex: null,
        shotPictureSrc: '',
        ydText: '',
        ydAjzjclfy: '',
        TsText: '',
        TsDivShow: false,
        TsDivShow2: false,
        Printscreen: false,
        pdfIamge: 'data:image/png;base64,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',
        angleRotation: 0,
        cropImage: '',
        cutImgSource: '',
        imgwidth: '',
        imgHeight: ''
      }
    },
    watch: {
      curNode (old, value) {
        this.UPDATE_ISCUTPICTURE(false)
      }
    },
    created () {
      this.SET_ISLOAD(false)
      this.scaleIndex = 1
      this.rotate = 0
      this.scale = ['50%', '75%', '100%', '125%', '150%', '200%', '300%', '400%']
    },
    mounted () {
      document.addEventListener('keydown', this.keydown)
      var self = this
      window.addEventListener('loadComplete', () => {
        this.SET_ISLOAD(false)
        console.log('loadComplete')
      })
      window.addEventListener('tishi', function (data) {
        if (data.detail.result) {
          self.TsText = data.detail.ts
          self.TsDivShow = true
          self.TsDivHide()
        } else {
          self.TsText = data.detail.ts
          self.TsDivShow2 = true
          self.TsDivHide()
        }
      })
      window.addEventListener('sousuo', (data) => {
        if (data.detail.text !== '') {
          // self.eventBus.emit('qwjsShow', {text: data.detail.text})
        } else {
          self.TsText = '搜索失败'
          self.TsDivShow2 = true
          self.TsDivHide()
        }
      })
      window.addEventListener('yidian', function (data) {
        if (data.detail.text !== '') {
          self.ydText = data.detail.text
          self.$http.post(self.$store.state.site.serviceUrl + '/dzjz/zjclbydzjz',
            {'bmsah': self.$store.state.site.bmsah, 'dzjzmlbh': self.curNode.dzjzMLBH ? self.curNode.dzjzMLBH : self.curNode.dzjzMlbh, 'dzjzwjbh': self.curNode.dzjzWJBH ? self.curNode.dzjzWJBH : self.curNode.dzjzWjbh}).then((r) => {
              if (r.body.errCode === 200) {
                self.dialog.dialogTitle = '添加疑点'
                self.dialog.pdfType = 0
                self.ydAjzjclfy = r.body.data.ajzjclfy
                self.dialog.tips.zjmc = self.curNode.label
                self.dialog.tips.ydnr = data.detail.text
                self.eventBus.emit('doubtDialogShow')
              }
            })
        } else {
          self.TsText = '添加疑点失败'
          self.TsDivShow2 = true
          self.TsDivHide()
        }
      })
      window.addEventListener('zhaiyao', function (data) {
        var ajzjclfy = ''
        if (self.curNode.dzjzWjbh && self.curNode.dzjzMlbh) { // 卷宗树
          self.$http.post(self.$store.state.site.serviceUrl + '/dzjz/zjclbydzjz',
            {'bmsah': self.$store.state.site.bmsah, 'dzjzwjbh': self.curNode.dzjzWjbh, 'dzjzmlbh': self.curNode.dzjzMlbh}).then((r) => {
              ajzjclfy = r.body.data.ajzjclfy
              if (self.$store.state.site.model === 3) {
                self.api.zjsc.getzjscxx({ajxxbh: self.$store.state.site.ajxxbh, bmsah: self.$store.state.site.bmsah, ajzjclbh: ajzjclfy}).then(res => {
                  if (res.errCode === 200) {
                    console.log(res.data)
                    if (res.data && res.data.length > 0) {
                      if (res.data[0].ajfzssqkBeanList[0].zjsczy) {
                        data.detail.text = res.data[0].ajfzssqkBeanList[0].zjsczy + data.detail.text
                      }
                      self.api.zjsc.editzjscxx({ajfzssqkfxbh: res.data[0].ajfzssqkBeanList[0].ajfzssqkfxbh, zjsczy: data.detail.text}).then(res => {
                        if (res.errCode === 200) {
                          self.TsText = '添加摘要成功'
                          self.eventBus.emit('zhaiyaoSucc')
                          self.TsDivShow = true
                          self.TsDivHide()
                        }
                      })
                    } else {
                      self.TsText = '请选择关联事实'
                      self.TsDivShow2 = true
                      self.TsDivHide()
                    }
                  }
                })
              } else {
                if (data.detail.text !== '') {
                  self.$http.post(self.$store.state.site.serviceUrl + '/zjgl/ajzjxxsc',
                    {'ajzjclbh': ajzjclfy, 'zjzy': data.detail.text, 'ajxxbh': self.$store.state.site.ajxxbh}).then((r) => {
                      if (r.body.errCode === 200) {
                        self.TsText = '添加摘要成功'
                        self.eventBus.emit('zhaiyaoSucc')
                        self.TsDivShow = true
                        self.TsDivHide()
                      }
                    })
                } else {
                  self.TsText = '添加摘要失败'
                  self.TsDivShow2 = true
                  self.TsDivHide()
                }
              }
            })
        } else {
          if (self.$store.state.site.model === 3) {
            self.api.zjsc.getzjscxx({ajxxbh: self.$store.state.site.ajxxbh, bmsah: self.$store.state.site.bmsah, ajzjclbh: self.curNode.bh}).then(res => {
              if (res.errCode === 200) {
                console.log(res.data)
                if (res.data && res.data.length > 0) {
                  if (res.data[0].ajfzssqkBeanList[0].zjsczy) {
                    data.detail.text = res.data[0].ajfzssqkBeanList[0].zjsczy + data.detail.text
                  }
                  self.api.zjsc.editzjscxx({ajfzssqkfxbh: res.data[0].ajfzssqkBeanList[0].ajfzssqkfxbh, zjsczy: data.detail.text}).then(res => {
                    if (res.errCode === 200) {
                      self.TsText = '添加摘要成功'
                      self.eventBus.emit('zhaiyaoSucc')
                      self.TsDivShow = true
                      self.TsDivHide()
                    }
                  })
                } else {
                  self.TsText = '请选择关联事实'
                  self.TsDivShow2 = true
                  self.TsDivHide()
                }
              }
            })
          } else {
            if (data.detail.text !== '') {
              self.$http.post(self.$store.state.site.serviceUrl + '/zjgl/ajzjxxsc',
                {'ajzjclbh': self.curNode.bh, 'zjzy': data.detail.text, 'ajxxbh': self.$store.state.site.ajxxbh}).then((r) => {
                  if (r.body.errCode === 200) {
                    self.TsText = '添加摘要成功'
                    self.eventBus.emit('zhaiyaoSucc')
                    self.TsDivShow = true
                    self.TsDivHide()
                  }
                })
            } else {
              self.TsText = '添加摘要失败'
              self.TsDivShow2 = true
              self.TsDivHide()
            }
          }
        }
      })
      window.addEventListener('pizhu', function (data) {
        if (self.curNode.dzjzWjbh && self.curNode.dzjzMlbh) {
          self.$http.post(self.$store.state.site.serviceUrl + '/dzjz/zjclbydzjz',
            {'bmsah': self.$store.state.site.bmsah, 'dzjzwjbh': self.curNode.dzjzWjbh, 'dzjzmlbh': self.curNode.dzjzMlbh}).then((r) => {
              self.pzText = data.detail.text
              if (data.detail.text !== '') {
                self.dialog.dialogTitle = '添加批注'
                self.dialog.pdfType = 1
                self.pzAjzjclfy = r.body.data.ajzjclfy
                self.dialog.tips.zjmc = self.curNode.label
                self.dialog.tips.ydnr = data.detail.text
                self.eventBus.emit('doubtDialogShow')
              } else {
                self.TsText = '添加批注失败'
                self.TsDivShow2 = true
                self.TsDivHide()
              }
            })
        } else {
          if (data.detail.text !== '') {
            self.$http.post(self.$store.state.site.serviceUrl + '/ajsc/saveajpz',
              {'ajzjclfy': {'ajzjclfy': self.curNode.bh}, 'ajxx': {'ajxxbh': self.$store.state.site.ajxxbh}, 'ydnr': data.detail.text}).then((r) => {
                self.pzText = data.detail.text
                if (r.body.errCode === 200) {
                  self.dialog.dialogTitle = '添加批注'
                  self.dialog.pdfType = 1
                  self.pzAjzjclfy = self.curNode.bh
                  self.dialog.tips.zjmc = self.curNode.label
                  self.dialog.tips.ydnr = data.detail.text
                  self.eventBus.emit('doubtDialogShow')
                }
              })
          } else {
            self.TsText = '添加批注失败'
            self.TsDivShow2 = true
            self.TsDivHide()
          }
        }
      })
    },
    methods: {
      ...pdf.mapActions(['zjwbNode', 'shibie', 'pdfCutImg', 'saveQj']),
      ...pdf.mapMutations(['UPDATE_PREARROW', 'UPDATE_NEXTARROW', 'UPDATE_SHOWCLFZDATA', 'UPDATE_ISCUTPICTURE', 'UPDATE_CLZTINDEX', 'SET_ISLOAD']),
      ...ptzjsc.mapMutations(['UPDATEEVIDEXPAND']),
      ...vuex.mapMutations(['UPDATE_CURNODE', 'UPDATE_PDFURL']),
      viewFind () {
        document.getElementById('pdfjs').contentWindow.viewFind()
      },
      zoomOut () {
        // document.getElementById('pdfjs').contentWindow.toolbar()
        if (this.scaleIndex <= 0) {
          return
        }
        this.scaleIndex = this.scaleIndex - 1
        // this.$refs.pdfimg.style.transform = `scale(${this.scale[this.scaleIndex]})`
        this._scale()
        this.$refs.pdftitle.changeSelect(this.scaleIndex + 4)
      },
      showdzqz (e) {
        this.sdzqz = e
      },
      zoomIn () {
        // document.getElementById('pdfjs').contentWindow.zoomIn()
        if (this.scaleIndex >= this.scale.length - 1) {
          return
        }
        this.scaleIndex = this.scaleIndex + 1
        // this.$refs.pdfimg.style.transform = `scale(${this.scale[this.scaleIndex]})`
        this._scale()
        this.$refs.pdftitle.changeSelect(this.scaleIndex + 4)
      },
      pageRotateCw () {
        this.rotate = this.rotate + 90
        this.$refs.pdfimg.style.transform = `rotate(${this.rotate}deg)`
      },
      pageRotateCcw () {
        this.rotate = this.rotate - 90
        this.$refs.pdfimg.style.transform = `rotate(${this.rotate}deg)`
      },
      scaleSelect (data) {
        let index = this.scale.findIndex(i => {
          return i === data
        })
        if (index === -1) {
          if (data === 'page-actual') {
            let w = this.$refs.pdfimg.naturalWidth + 'px'
            this._scale(w)
          } else {
            this._scale(data)
          }
        } else {
          this.scaleIndex = index
          this._scale()
        }
      },
      _scale (data) {
        if (data) {
          this.$refs.pdfimg.style.width = data
        } else {
          this.$refs.pdfimg.style.width = this.scale[this.scaleIndex]
        }
        this.$refs.pdfWrapper.style.scrollTop = 0
        this.$refs.pdfWrapper.style.scrollLeft = 0
      },
      zjwbClick (data) {
        this.showTextArea = true
        this.returnBtnShow = true
        this.zjwbNode()
      },
      Move (data) {
        if (this.curNode) {
          this.$emit('pdfMove', {name: this.curNode.title, url: 'pdfiframe', iframeUrl: this.pdfUrl, curNode: this.curNode})
        }
      },
      // 从证据文本返回PDF 模式
      returnClick () {
        this.showTextArea = false
        this.returnBtnShow = false
      },
      initjzPdf (node) {
        let curNode = node
        this.curNode = node
        this.state.node = curNode
        this.eventBus.emit('yjbj_first', curNode)
        this.address = this.$store.getters.pdfAddress(curNode.dzjzMlbh, curNode.dzjzWjbh)
        // this.eventBus.emit('initPdf')
        this.eventBus.emit('curNodeFirstData', curNode)
        // 第一次加载证据文本 显示PDF第一页文本内容
        this.$http.post(this.$store.state.site.serviceUrl + '/zjgl/getpdftext',
        {'bmsah': this.$store.state.site.bmsah, 'dzjzmlbh': curNode.dzjzMlbh, 'dzjzwjbh': curNode.dzjzWjbh}).then((r) => {
          if (r.body.errCode === 200) {
            this.showTextAreaContent = r.body.data
          }
        })
      },
      compare (property) {
        return function (a, b) {
          var value1 = a[property]
          var value2 = b[property]
          return value1 - value2
        }
      },
      changeModel () {
        if (this.model === 1) {
          for (var i = 0; document.getElementsByTagName('iframe').length; i++) {
            document.getElementsByTagName('iframe')[i].contentWindow.pdfChangeModel()
          }
        }
      },
      left () {
        this.mouseLeft = true
      },
      right () {
        this.mouseRight = true
      },
      leftLeave () {
        this.mouseLeft = false
      },
      rightLeave () {
        this.mouseRight = false
      },
      keydown (e) {
        // debugger
        if (e.keyCode === 37) {
          this.prePage()
        } else if (e.keyCode === 39) {
          this.nextPage()
        }
        // e.preventDefault()
      },
      addfzsucc () {
        this.TsDivShow = true
        this.TsText = '添加分组成功'
        var self = this
        setTimeout(function () {
          self.TsDivShow = false
        }, 2000)
      },
      TsDivHide () {
        var self = this
        setTimeout(function () {
          self.TsDivShow = false
          self.TsDivShow2 = false
        }, 2000)
      },
      prePage () {
        this.SET_ISLOAD(true)
        this.$eventbus.emit('prePage', this.treeMark)
      },
      nextPage () {
        this.SET_ISLOAD(true)
        this.$eventbus.emit('nextPage', this.treeMark)
      },
      cancelChecked (source) {
        for (var i = 0; i < source.length; i++) {
          for (var j = 0; j < source[i].children.length; j++) {
            if (source[i].children[j].selected) {
              source[i].children[j].selected = false
              break
            }
          }
        }
      },
      cancelZJChecked (source) {
        for (var i = 0; i < source.length; i++) {
          for (var j = 0; j < source[i].children.length; j++) {
            for (var x = 0; x < source[i].children[j].children.length; x++) {
              if (source[i].children[j].children[x].selected) {
                source[i].children[j].children[x].selected = false
                break
              }
            }
          }
        }
      },
      scws () {
        this.tabss.push({name: '文书管理', view: 'makeFile'})
        this.isMakeFile = true
      },
      openView (view) {
        if (view) {
          this.isMakeFile = true
        }
      },
      removetab (index, e) {
        this.tabss.splice(index, 1)
        this.isMakeFile = false
        e.stopPropagation()
      },
      dialogSave (data) {
        var self = this
        self.$http.post(self.$store.state.site.serviceUrl + '/ajsc/saveajyd',
          {'ajzjclfy': {'ajzjclfy': self.ydAjzjclfy}, 'ajxx': {'ajxxbh': self.$store.state.site.ajxxbh}, 'clzt': 'N', 'ydnr': data.ydnr, 'ydfx': data.ydfx}).then((r) => {
            if (r.body.errCode === 200) {
              self.TsText = '添加疑点成功'
              self.TsDivShow = true
              self.TsDivHide()
            } else {
              self.TsText = '添加疑点失败'
              self.TsDivShow2 = true
              self.TsDivHide()
            }
          })
      },
      dialogSave1 (data) {
        var self = this
        self.$http.post(self.$store.state.site.serviceUrl + '/ajsc/saveajpz',
          {'ajzjclfy': {'ajzjclfy': self.pzAjzjclfy}, 'ajxx': {'ajxxbh': self.$store.state.site.ajxxbh}, 'ydnr': data.ydnr, 'ydfx': data.ydfx, 'zt': 2}).then((r) => {
            if (r.body.errCode === 200) {
              self.TsText = '添加批注成功'
              self.TsDivShow = true
              self.TsDivHide()
            } else {
              self.TsText = '添加批注失败'
              self.TsDivShow2 = true
              self.TsDivHide()
            }
          })
      },
      cutPicture () {
        // 让截图组件显示
        // 获取base64,获取旋转角度（pdfjs）
        this.UPDATE_ISCUTPICTURE(!this.isCutPicture)
        if (this.isCutPicture) {
          let c = document.getElementById('pdfjs').contentWindow.document.getElementById('page1')
          this.imgwidth = c.width
          this.imgHeight = c.height
          let add = c.toDataURL('image/png')
          this.cutImgSource = add
        } else {
          this.$eventbus.emit('cancelCut')
        }
      },
      saveCutImg (data) { // 保存截图
        if (data.node) { // 保存情节
          let source = {}
          source.cltp = data.imgData
          source.qj_dm = data.node.id
          source.qj_mc = data.node.title
          source.qjmc = data.node.title
          source.qjsm = data.comment
          source.sarybhlist = []
          for (let item of data.sary) {
            source.sarybhlist.push(item.sarybh)
          }
          this.saveQj(source)
        } else if (data.qjmc) {
          let source = {}
          source.cltp = data.imgData
          source.qj_dm = ''
          source.qj_mc = ''
          source.qjmc = data.qjmc
          source.qjsm = data.comment
          source.sarybhlist = []
          for (let item of data.sary) {
            source.sarybhlist.push(item.sarybh)
          }
          this.saveQj(source)
        } else {
          let obj = {}
          obj.zjbzlxbh = data.index
          obj.zjbzmc = data.zjbzmc
          obj.zjbzwz = data.text
          obj.zjbztppath = data.imgData
          this.pdfCutImg(obj)
        }
        this.UPDATE_ISCUTPICTURE(false)
      },
      expandEvid () {
        this.UPDATEEVIDEXPAND(!this.evidExpand)
        if (this.evidExpand) {
          this.UPDATE_CLZTINDEX('')
          this.UPDATE_SHOWCLFZDATA(false)
        }
      }
    }
  }
</script>
<style scoped>
.pages-right-enter-active {
  animation: bounce-right .3s ease-in;
}
.pages-right-leave-active {
  animation: bounce-right .3s ease-in reverse;
}
.pages-left-enter-active {
  animation: bounce-left .3s ease-in;
}
.pages-left-leave-active {
  animation: bounce-left .3s ease-in reverse;
}
@keyframes bounce-right {
  0% {
    opacity: 0;
    transform: translate3d(100px, 0, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes bounce-left {
  0% {
    opacity: 0;
    transform: translate3d(-100px, 0, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

  .pdf{
    width:100%;
    height:100%;
    background: #d7e4f5;
    box-sizing: border-box;
    padding:7px 10px 10px;
  }
   .pdf>.pdf-content{
    overflow: hidden;
    width: 100%;
    height:100%;
    box-sizing: border-box;
    background: #fff;
    position: relative
  }
  .pdf>.pdf-content>.left-content{
    height:calc(100% - 35px);
    box-sizing: border-box;
  }
  .pBtn{
    position: absolute;
    color:#71050F;
  }
  .mouseLeft, .mouseRight{
    position: absolute;
    width:10%;
    min-width:55px;
    height:60%;
    z-index:2;
  }
  .mouseLeft{
    left:0;
    top: 20%;
  }
  .mouseRight{
    right:50px;
    top:20%;
  }
  .preBtn{
    left: 30px;
    top: calc(50% - 22.5px);
    width:55px;
    height:55px;
    cursor: pointer;
    background: url("../../../static/images/caseCheck/pdfLeft.png");
  }
  .nextBtn{
    right: 40px;
    top: calc(50% - 22.5px);
    width:55px;
    height:55px;
    cursor: pointer;
    background: url("../../../static/images/caseCheck/pdfRight.png");
  }
  .left-arrow{
    display: none;
    position: absolute;
    width:9px;
    height:93px;
    top:45%;
    right:-9px;
    cursor: pointer;
    background: url("../../../static/images/caseCheck/left-arrow.png") no-repeat;
  }
  ::-webkit-scrollbar {
    width: 8px;
    height: 10px;
    background-color: #d6dde2;
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    background-color: #d6dde2;
  }
  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #4c89b6;
  }
  .pdfContent {
    width: 100%;
    height:100%;
    font-size: 0;
    box-sizing: border-box;
    background: #F3FAFD;
    position: relative;
  }
  .isIllegal{
    width:100%;
    height:calc(100% - 95px);
  }
  .resizeR{
    width: 10px;
    height: 100%;
    position: absolute;
    right: 0;
  /*  z-index: 10;*/
    top: 0;
    cursor: w-resize;
  }
  .showTextArea{
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 2;
   padding: 30px 50px;
    box-sizing: border-box;
    line-height: 24px;
    word-wrap: break-word;
    color: #333;
    font-size: 14px;
    border: none;
    font-family: "Microsoft YaHei";
    overflow: auto;
    background-color: #fff;
  }
  .showTextArea pre{
    display: block;
    width: 100%;
    word-break: normal;
    white-space: pre-wrap;
    overflow: hidden;
    font-size: 16px;
  }
  .pdf-wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
    text-align: center;
  }
  .pdf-wrapper > img {
    width: 80%;
    margin-top:2%;
  }
  .returnBtn_con{
    background-color: #fff;
    height: 30px;
    position: absolute;
    top: 0;
    left:0;
    z-index:3;
    width: calc(100% - 15px);
    box-sizing: border-box;
  }
  .returnBtn{
    float: right;
    width: 25px;
    height: 25px;
    margin-right: 10px;
    margin-top: 5px;
    background: url("../../../static/images/12342.png") 0px 1px no-repeat;
    color:#3279AF;
    border-radius: 3px;
    text-align: right;
    padding-right: 10px;
    cursor: pointer;
    box-sizing: border-box;
    line-height: 20px;
  }
  .TsDiv{
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 10px 15px;
    background: #DFF0D8;
    border-radius: 3px;
    color: #238A25;
    font-size: 14px;
    border: 1px solid #8FC661;
    z-index: 10;
    box-shadow: 0px 0px 8px 3px #DFF0D8;
  }
  .TsDiv img{
    margin-bottom: -3px;
    margin-right: 10px
  }
  .TsDiv2{
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 10px 15px;
    background: #F2DEDE;
    border-radius: 3px;
    color: #D73A25;
    font-size: 14px;
    border: 1px solid #EF5E4B;
    z-index: 10;
    box-shadow: 0px 0px 8px 3px #F2DEDE;
  }
  .TsDiv2 img{
    margin-bottom: -3px;
    margin-right: 10px
  }
  .cutPictureBox{
    position: fixed;
    top:100px;
    left: 900px;
    width:300px;
    height:300px;
    background-color: #eee;
  }
  .close{
 position:relative;
 left: 10px;
 width:0.2em;
 height:1em;
 background: #333;
 -webkit-transform: rotate(45deg);
 -moz-transform: rotate(45deg);
 -o-transform: rotate(45deg);
 -ms-transform: rotate(45deg);
 transform: rotate(45deg);
 display: inline-block;
}
.close:after{
 content: "";
 position: absolute;
 top: 0;
 left: 0;
 width:0.2em;
 height:1em;
 background: #333;
 -webkit-transform: rotate(270deg);
 -moz-transform: rotate(270deg);
 -o-transform: rotate(270deg);
 -ms-transform: rotate(270deg);
 transform: rotate(270deg);
}
#pdfjs{
  height:300px;
}
.pictureShotBox{
  position: absolute;
  top:0px;
  left: 0px;
  z-index: 3;
  width:100%;
  height:100%;
  overflow-y: auto;
}
.evidGuide{
  position: absolute;
  right: 0;
  bottom:0;
  width:calc(100% - 25px);
  box-sizing: border-box;
  margin: 0 15px 10px 10px;
}
.pdfContent>.allPast{
 border: 1px solid #2da44f;
}
.pdfContent>.somePast{
  border: 1px solid #3786c2;
}
.pdfContent>.noPast{
  border: 1px solid #df5c2e;
}
.pdfContent>.success{
 border: 1px solid #1db5cc;
}
.pdfContent>.materialGroup{
  position: absolute;
  top:10px;
  left:20px;
 display: inline-block;
}
.pdfContent>.clState{
  position: absolute;
  top:10px;
  right:20px;
 display: inline-block;
}
.evidGuideFold{
  margin-bottom: 20px;
}
.evidFold{
  height:40px;
}

</style>
