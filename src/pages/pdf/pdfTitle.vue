<template>
  <div class="title">
    <ul class="pdfTitle" >
      <!--<li title="搜索" @click="viewFind()">
        <img src="/static/images/caseCheck/sousuo.png">
      </li>-->
      <li title="缩小" @click="zoomOut()" class="pdfBR">
        <div class="pdfwrapper" :class="active === 1 ? 'active' : ''"><img src="../../../static/images/caseCheck/jian.png"></div>
      </li>
      <li title="放大" @click="zoomIn()">
        <div class="pdfwrapper" :class="active === 2 ? 'active': ''"><img src="../../../static/images/caseCheck/jia.png"></div>
      </li>
      <li>
        <div class="pdfwrapper" style="margin:0 0 0 10px;" title="自动缩放">
          <select ref="select" class="autoZoom" title="自动缩放" @change="scaleSelect($event)">
            <option selected="selected" value="80%">自动缩放</option>
            <option value="page-actual">实际大小</option>
            <option value="80%">适合页面</option>
            <option value="95%">适合页宽</option>
            <option value="50%">50%</option>
            <option value="75%">75%</option>
            <option value="100%">100%</option>
            <option value="125%">125%</option>
            <option value="150%">150%</option>
            <option value="200%">200%</option>
            <option value="300%">300%</option>
            <option value="400%">400%</option>
          </select>
        </div>
      </li>
      <li class="pdfBR" title="顺时针旋转" @click="pageRotateCw()">
        <div class="pdfwrapper" :class="active === 3 ? 'active': ''"><img src="../../../static/images/caseCheck/xuanzhuan.png"></div>
      </li>
      <li class="pdfBR" title="逆时针旋转" @click="pageRotateCcw()">
        <div class="pdfwrapper" :class="active === 4 ? 'active': ''"><img src="../../../static/images/caseCheck/xuanzhuan1.png"></div>
      </li>
      <li class="pdfBR" title="移动" @click="cutPicture()">
        <div class="pdfwrapper" :class="active === 5 ? 'active': ''"><img src="../../../static/images/caseCheck/yidong.png"></div>
      </li>
    </ul>
    <div class="right-title" @click="click">
      <i class="icon1"></i>电子卷宗
    </div>
  </div>
</template>
<script>
export default{
  name: 'pdfTitle',
  props: ['treeData'],
  data () {
    return {
      active: -1,
      showdzqz: false,
      showTextArea: false,
      isShowStuffTips: false, // 非法证据
      isShowRelateTips: false, // 关联证据
      isShowGuideTips: false, // 审查指引
      isEvidenceModel: false, // 是否为证据模式
      isShowFunc: false,
      node: null,
      title: null,
      guide: null,
      guideInfo: null,
      relateInfo: null,
      activeClick: false,
      activeClick2: false,
      dialogVisible: false,
      isIllegal: false, // 是否非法
      showTips: false // 提示是否设定为非法证据
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    changeSelect (index) {
      this.$refs.select.options[index].selected = true
    },
    click () {
      this.showdzqz = !this.showdzqz
      this.$emit('showdzqz', this.showdzqz)
    },
    viewFind () {
      this.$emit('viewFind')
    },
      // 缩小
    zoomOut () {
      this.$emit('zoomOut')
      this.active = 1
    },
      // 放大
    zoomIn () {
      this.$emit('zoomIn')
      this.active = 2
    },
      // 顺时针旋转
    pageRotateCw () {
      this.$emit('pageRotateCw')
      this.active = 3
    },
      // 逆时针旋转
    pageRotateCcw () {
      this.active = 4
      this.$emit('pageRotateCcw')
    },
      // 缩放比例
    scaleSelect (data) {
      this.$emit('scaleSelect', data.currentTarget.value)
    },
    cutPicture () {
      this.active = 5
      // this.$emit('cutPicture')
    }
  }
}
</script>
<style scoped>
.pdfwrapper {
  padding:0 6px;
  margin:0px 10px;
}
.active {
    background: linear-gradient(180deg, #fcfcf4, #f1d4ac, #f9b353, #fbe6ad);
    border: 1px solid #e1e1e1;
  }
.autoZoom {
  height: 23px;
  width: 108px;
  border:1px solid #b2cef3;
}
  .title{
    width: 100%;
    height:35px;
    box-sizing: border-box;
    border: 1px solid #b2cef3;
    background: url(./gb01.png) top left repeat-x;
  }
  .title .materialCho{
    width:150px;
    height:35px;
    float:left;
    padding-left: 10px;
    box-sizing: border-box;
  }
   .title .materialCho span{
     font-size: 12px;
     float: left;
     height: 23px;
     line-height: 23px;
     margin-top: 7.5px;
     padding: 0 10px;
     border: 1px solid #A4D3ED;
     border-radius: 3px;
     cursor: pointer;
   }
   .title .materialCho span:first-child{
     border-right:none;
     border-top-right-radius: 0;
     border-bottom-right-radius: 0;
   }
    .title .materialCho span:last-child{
     border-left:none;
     border-top-left-radius: 0;
     border-bottom-left-radius: 0;
   }
    .title .materialCho span.active{
      background-color: #3786c2;
      color:#fff;
    }
  .pdfTitle{
    /* width:calc(100% - 150px); */
    height:35px;
    box-sizing: border-box;
    position: relative;
    float:left;
  }
  .pdfTitle img{
    margin-bottom: -4px;
  }
  .pdfTitle li{
    list-style: none;
    float: left;
    height: 23px;
    line-height: 23px;
    margin-top: 5.5px;
    cursor: pointer;
    font-size: 14px;
    
  }
  
  .right-title{
    float: right;
    line-height: 35px;
    font-size: 12px;
    padding-right: 15px;
    cursor: pointer;
    color: #2970a6;
  }
  .right-title .icon1{
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: -3px;
    margin-right: 10px;
    background:url(./icon-000xxx.png) no-repeat; 
  }

  .pdfTitle span i{
    display: inline-block;
    width: 5px;
    font-size: 0;
  }
  .pdfTitle span i img{
    margin-bottom: 0;
  }
  .pdfTitle span i img:first-child{
    margin-bottom: 2px;
  }
  .clstate{
    float:right;
  }
  .pdfName{
    float:left;
    color:#00487e;
    height:35px;
    line-height: 35px;
  }
  .pdfFunction{
    float:right;
    color:#2176bf;
    font-size: 14px;
  }
  .stuff-icon{
    float:left;
    width:16px;
    height:100%;
  }
  .guide-icon{
    float:left;
    width:16px;
    height:100%;
    padding-top: 4px;
  }
  .stuff-icon span{
    display: inline-block;
    width:20px;
    height:7px;
    margin-right: 10px;
    background: url("/static/images/caseCheck/icon_glzj.png") no-repeat;
    background-size: 100% 100%;
  }
  .guide-icon span{
    display: inline-block;
    width:16px;
    height:18px;
    margin-right: 10px;
    background: url("/static/images/caseCheck/guide.png");
  }
  .stuff{
    margin-right: 10px;
  }
  .stuff,.guide{
    float:left;
    height:30px;
    line-height: 30px;
    padding: 3px 10px;
    cursor: pointer;
  }

  .stuffText,.guideText{
    display: inline-block;
    padding-left: 10px;
    height:30px;
    line-height: 30px;
    font-size: 14px;
  }
  .body-top{
    height:50%;
    width:100%;
    box-sizing: border-box;
    border-bottom: 1px dashed #9ab8d9;
  }
  .body-bottom{
    height:50%;
    width:100%;
  }
  .stuffTips{
    width:100%;
    height:55px;
    box-sizing: border-box;
    padding: 0 10px;
    /* position: absolute;
    top:35px;
    left:0;
    z-index:100; */
    background-color: rgba(255,147,42,.2);
  }
  /* .tips-left, .tips-right{
    height:55px;
    line-height: 55px;
  }
  .tips-left{
    float:left;
  }
  .tips-right{
    float:right;
  }
  .tips-left >span{
    display: inline-block;
    padding-left: 10px;
    color:#b00;
  } */
  .stuffTips-icon{
    float:left;
    width:22px;
    height:100%;
    padding-top: 6px;
  }
  .stuffTips-icon span{
    display: inline-block;
    width:24px;
    height:23px;
    background: url("/static/images/caseCheck/stuff-tips.png");
  }
  .tips-btn {
    display: inline-block;
    padding:3px 15px;
    cursor: pointer;
  }
  .up-triangle{
    width:0;
    height:0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;
    position: absolute;
    top:-6px;
    right:35px;
  }
  /*.active{
    background: url("~static/images/caseCheck/evidence.png");
    background-size: 100% 100%;
  }*/
  .tips-right{
    margin-right: 15px;
  }
  .tips-btn{
    display: inline-block;
    height:24px;
    line-height: 24px;
    width:88px;
    font-size: 14px;
    text-align: center;
    color:#fff;
    background:url("/static/images/caseCheck/jcf.png");
    background-size: 100% 100%;
  }
  .tips-btn:hover{
    display: inline-block;
    height:24px;
    line-height: 24px;
    width:88px;
    text-align: center;
    color:#fff;
    background:url("/static/images/caseCheck/jcf-ax.png");
    background-size: 100% 100%;
  }
  .guideContent, .guideCheck{
    padding: 20px 15px 15px 15px;
    color:#333;
    font-family: "Microsoft YaHei";
    font-size: 14px;
  }
  .guideCheck li{
    list-style: none;
    height:30px;
    line-height: 30px;
  }
  .guideContent a{
    color:#00487e;
    float:right;
  }
  .guideContent li {
    list-style: none;
  }
  .guideContent li span{
    /* display: inline-block;
     padding: 0 5px;*/
  }
  .stuff{
    position: relative;
  }
  .relateTips{
    position: absolute;
    width:200px;
    top: 35px;
    right: 20px;
    z-index: 200;
    background-color: #fff;
    box-shadow: 0 0 15px #aaa;
    border-radius: 3px;
  }
  .relateTips li{
    list-style: none;
  }
  .relateContent{
    padding: 20px 15px 15px 15px;
    color: #333;
    font-size: 14px;
  }
  .relateContent li a{
    color: #2176bf;
  }
  .body-content{
    width:100%;
    height:100%;
  }
  .guideTitle{
    height:30px;
    line-height: 30px;
    font-size: 14px;
    font-weight: bold;
  }
  .body-tips{
    width:190px;
    height:60px;
    line-height: 60px;
    font-size: 14px;
    float:left;
  }
  .body-tips span a {
    display: inline-block;
    color:#2176bf;
    margin-left: 10px;
  }
  .wrap{
    width:100%;
    height:100%;
    box-sizing: border-box;
    padding: 0 10px;
    border: 1px solid #9ab8d9;
    position: relative;
  }
  li .checkBox{
    width:15px;
    height:15px;
    float: left;
    margin-top: 7px;
    margin-right: 10px;
    background: url("/static/images/caseCheck/icon_xz1.png") no-repeat center center;
  }
  li.active .checkBox{
    background: url("/static/images/caseCheck/icon_xz.png") no-repeat center center;
  }
  .tips{
    width:200px;
    height:50px;
    position: absolute;
    top:45%;
    left:45%;
    color:#000;
  }
  .tips span{
    display: inline-block;
    width:50px;
    height:30px;
  }
  .activeClick{
    background-color: #1A87DC;
    color: #fff;
    padding-top: 10px;
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    margin-top: 5px !important;
  }
  .activeClick2{
    background-color: #1A87DC;
    color: #fff;
    padding-top: 10px;
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    margin-top: 5px !important;
  }
  .pdfTitle li.activeClick:hover{
    line-height: 30px;
    height:30px;
  }
  .pdfTitle li.activeClick2:hover{
    line-height: 30px;
    height:30px;
  }
  .pdfTitle li img{
    margin-bottom: -4px;
  }
  .pdfTitle li.activeClick img{
    margin-bottom: -2px;
  }
  .pdfTitle li.activeClick2 img{
    margin-bottom: -2px;
  }
/*  .pdfTitle li:nth-child(7),.pdfTitle li:nth-child(6){
    margin-top: 7.5px;
   }
  .pdfTitle li:nth-child(6):hover{
    height: 30px;
    margin-top: 2.5px;
    line-height: 34px;
    background-color: #1A87DC;
  }
  .pdfTitle li:nth-child(7):hover{
    height: 30px;
    margin-top: 2.5px;
    line-height: 30px;
    background-color: #1A87DC;
  } */
  .pdfBR{
    border-right: 1px solid #9abade;
  }
</style>
