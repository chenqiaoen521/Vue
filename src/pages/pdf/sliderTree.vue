<template>
  <div class="tree-my" :class="[{treeSlider: isMouse || isNail}, {hideSlider: !isMouse && !isNail}]" @mouseleave="hide">
    <div class="treeList">
      <ul class="list">
        <li v-for="(item, index) in sliderArr" class="sliderarrli" :class="{active: sliderIndex == index}" 
          @mouseover="toggleSlider(index, item)">
          {{item.mc}}
        <div class="triangle" v-show="sliderIndex === index"></div>
        </li>
      </ul>
      <div v-show="isMouse || isNail" class="treeContent">
        <span :class="[{nail: !isNail}, {nailActive: isNail}]" @click="changeNailState"></span>
        <transition name="jzTreetran">
         <jzTree v-show="sliderIndex === 0"></jzTree>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import jzTree from './jzTree.vue'
  import vuex from 'vuex'
  const pdf = vuex.createNamespacedHelpers('pdf')
  export default{
    name: 'sliderTree',
    components: {jzTree},
    data () {
      return {
        // treeArr: [],
        sliderArr: [{mc: '新建文书'}, {mc: '再办文书'}, {mc: '文书列表'}],
        isMouse: false,
        isNail: false
      }
    },
    watch: {
      '$route.query.type': function (value) {
        let str = value + ''
        this.dealSlider(str)
      }
    },
    computed: {
      ...pdf.mapState(['sliderIndex', 'treeMark']),
      ...vuex.mapState(['model'])
    },
    mounted () {
      this.UPDATE_TREEMARK(0)
      this.UPDATE_SLIDERINDEX(0)
      // this.getSliderArr()
      // let str = this.$route.query.type + ''
      // this.dealSlider(str)
    },
    methods: {
      ...pdf.mapActions(['getSliderArr']),
      ...pdf.mapMutations(['UPDATE_SLIDERINDEX', 'UPDATE_TREEINDEX', 'UPDATE_TREEMARK']),
      dealSlider (str) {
        if (str !== '3') {
          this.sliderArr = [ {mc: '新建文书', jmlbh: null}, {mc: '再办文书', jmlbh: null} ]
        } else {
          this.sliderArr = [ {mc: '新建文书', jmlbh: null}, {mc: '再办文书', jmlbh: null}, {mc: '文书列表', jmlbh: null} ]
        }
      },
      initjzPdf (node) {
        this.$emit('initjzPdf', node)
      },
      toggleSlider (index, item) {
        this.UPDATE_SLIDERINDEX(index)
        this.isMouse = true
        if (index > 0) {
          this.UPDATE_TREEINDEX(index - 1)
        } else {
          this.UPDATE_TREEINDEX(index)
        }
      },
      createTreeData (data) {
        var arr = JSON.parse(JSON.stringify(data))
        for (var i = 0; i < arr.length; i++) {
          let arr2 = []
          for (var j = 0; j < arr[i].children.length; j++) {
            for (var m = 0; m < arr[i].children[j].children.length; m++) {
              arr[i].children[j].children[m].label = arr[i].children[j].label + '-' + this.number(m + 1, 3) + '(' + arr[i].children[j].children[m].wjym + ')'
              arr[i].children[j].children[m].parentId = arr[i].id
              arr[i].children[j].children[m].ajzjclbh = arr[i].children[j].bh
              arr2.push(arr[i].children[j].children[m])
            }
          }
          arr2.sort(this.compare('wjym'))
          arr[i].children = arr2
        }
        return arr
      },
      number (str, length) {
        return (Array(length).join('0') + str).slice(-length)
      },
      compare (property) {
        return function (a, b) {
          var value1 = a[property]
          var value2 = b[property]
          return value1 - value2
        }
      },
      hide (e) {
        e.preventDefault()
        this.isMouse = false
        this.UPDATE_SLIDERINDEX(this.treeMark)
      },
      changeNailState () {
        this.isNail = !this.isNail
      }
    }
  }
</script>
<style scoped>
.tree-my{
  transition: width 0.3s;
}
.sliderarrli {
  position: relative;
  background: linear-gradient(0deg, #dbebfa, #e8f1f8, #d0e7f7, #e7f6fd);
}
.sliderarrli:after{
  transition: transform .3s ease-out 0.1s;
  content: '';
  position: absolute;
  top: 0;
  height: 100%;
  width: 2px;
  left: -2px;
  transform: scale(1, 0);
  transform-origin: bottom;
  background: #2b72a8;
}
.treeSlider {
  width:350px;
  position: absolute;
  top:35px;
  
  right:0;
  box-sizing: border-box;

  z-index:3;
  bottom: 0;
  background-color: #fff;
}
.hideSlider{
  width:30px;
  position: absolute;
  top:35px;
  right:0;
  z-index:2;
  bottom: 0;
  overflow: hidden;
  overflow-y: auto;
  background-color: #fff;
}
.treeSlider >.treeList, .hideSlider >.treeList{
  width:100%;
  height:100%;
  overflow: hidden;
  overflow-y: auto;
  float:left;
}
.hideSlider >.treeList>.hideContent{
  display: none;
  overflow: hidden;
}
.treeSlider >.treeList>.treeContent{
  position: relative;
  width:calc(100% - 38px);
  border-right: 1px solid #d6dde2;
  height:100%;
  min-height:100%;
  overflow: hidden;
  overflow-y: auto;
  border-radius: 3px;
}
.treeSlider .list, .hideSlider .list{
  width:30px;
  box-sizing: border-box;
  height:100%;
  float:right;
  position: absolute;
  top:0;
  right:0;
  /*padding: 5px 0;*/
  z-index: 2;
  list-style: none;
  background-color: #fff;
  border-right: 1px solid #9ac1ea;
  border-left: 2px solid #cadef6;
  border-bottom: 1px solid #cadef6;
  /*border-right:1px solid #a4d3ed;*/
}
.treeSlider .list li, .hideSlider .list li{
  font-size: 14px;
  color:#13428a;
  padding:15px 8px;
  cursor: pointer;
  position: relative;
  border-bottom: 1px solid #a4d3ed;
}
.triangle{
  position: absolute;
  left:-8px;
  top:50%;
  margin-top: -5px;
  border: 5px solid transparent;
  border-left:5px solid #d6dde2;
}
.treeSlider .list li.active, .hideSlider .list li.active{
  
}
.treeSlider .list li.active:after, .hideSlider .list li.active:after{
  transition: transform .3s ease-out;
  transform-origin: top;
  transform: scale(1, 1);
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
.nail,.nailActive{
  position: absolute;
  top:6px;
  right:10px;
  width:18px;
  height: 18px;
  z-index:4;
  cursor: pointer;
}
.nail{
  background: url(/static/images/pdfModule/nail.png)
}
.nailActive{
  background: url(/static/images/pdfModule/nailActive.png)
}
.sdzqz-enter,.sdzqz-leave-to {
  transform: translate3d(100%, 0, 0);
}
.sdzqz-enter-to, .sdzqz-leave {
 transform: translate3d(0, 0, 0);
}
.sdzqz-enter-active,.sdzqz-leave-active{
  transition: all 0.3s ease-in-out;
}

.jzTreetran-enter,.jzTreetran-leave-to {
  transform: translate3d(100%, 0, 0);
}
.jzTreetran-enter-to, .jzTreetran-leave {
 transform: translate3d(0, 0, 0);
}
.jzTreetran-enter-active,.jzTreetran-leave-active{
  transition: all 0.3s ease-in-out;
}
</style>
