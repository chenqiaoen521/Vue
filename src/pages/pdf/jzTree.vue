<template>
<div class="jztree">
   <el-input size="small" placeholder="输入关键字进行检索" suffix-icon="el-icon-search" v-model="yzFilterText" class="js-input"></el-input>
 <!-- <v-tree ref='tree' :data='jztreeData' @node-click="nodeClick"/>  -->
     <el-tree ref="jzTree" style="float:left;width:100%"  class="jzTree"
              :data="jztreeData" 
              :props="defaultProps" 
              @node-click="handleNodeClick"
              node-key="id"
              :render-content=renderContent
              :expand-on-click-node="false"
              :filter-node-method="filterNode"
              highlight-current
              :default-expanded-keys="expandysnode"
              ></el-tree>
</div>
  
</template>
<script>
import vuex from 'vuex'
import ENV from '@/config/env/env.export'
const pdf = vuex.createNamespacedHelpers('pdf')
const ptzjsc = vuex.createNamespacedHelpers('ptzjsc')
export default {
  name: 'jzTree',
  mounted () {
    console.log(this.jztreeData)
    this.getJzTreeData()
    this.$eventbus.on('nextPage', (data) => {
      if (data < 1 && this.$refs.jzTree) {
        let mark = 'id'
        let source = this.jztreeData
        let nodes = []
        for (let i = 0; i < source.length; i++) {
          for (let j = 0; j < source[i].children.length; j++) {
            if (this.curNode[mark] === source[i].children[j][mark]) {
              this.firstIndex = i // 得到一级节点的下标
              this.curNodeIndex = j + 1
              nodes = source[i].children
              break
            }
          }
        }
        if (this.firstIndex <= source.length - 1) {
          if (this.curNodeIndex <= nodes.length - 1) {
            this.$refs.jzTree.setCurrentNode(nodes[this.curNodeIndex])
            this.UPDATE_CURNODE(nodes[this.curNodeIndex])
            if (this.firstIndex === source.length - 1 && this.curNodeIndex === nodes.length - 1) {
              this.UPDATE_PREARROW(true)
              this.UPDATE_NEXTARROW(false)
            } else {
              this.UPDATE_PREARROW(true)
              this.UPDATE_NEXTARROW(true)
            }
            let pdfUrl = `${ENV.PDF_ADDR}/static/pdfjs/web/viewer.html?file=${ENV.REMOTE_ADDR}/zjgl/zjlbml/${this.dwbm}/${this.bmsah}/${nodes[this.curNodeIndex].dzjzMlbh}/${nodes[this.curNodeIndex].dzjzWjbh}`
            this.UPDATE_PDFURL(pdfUrl)
          } else if (this.curNodeIndex > nodes.length - 1) {
            this.UPDATE_NEXTARROW(true)
            this.firstIndex = this.firstIndex + 1
            nodes = source[this.firstIndex].children
            nodes[0].selected = true
            this.curNodeIndex = 0
            this.$refs.jzTree.setCurrentKey(nodes[0].id)
            // let expandArr = []
            // expandArr.push(nodes[0].id)
            // this.UPDATE_EXPANDYSNODE(expandArr)
            this.UPDATE_CURNODE(nodes[0])
            let pdfUrl = `${ENV.PDF_ADDR}/static/pdfjs/web/viewer.html?file=${ENV.REMOTE_ADDR}/zjgl/zjlbml/${this.dwbm}/${this.bmsah}/${nodes[0].dzjzMlbh}/${nodes[0].dzjzWjbh}`
            this.UPDATE_PDFURL(pdfUrl)
          }
        }
      }
    })
    this.$eventbus.on('prePage', (data) => {
      if (data < 1 && this.$refs.jzTree) {
        let mark = 'id'
        let source = this.jztreeData
        let nodes = []
        for (let i = 0; i < source.length; i++) {
          for (let j = 0; j < source[i].children.length; j++) {
            if (this.curNode[mark] === source[i].children[j][mark]) {
              this.firstIndex = i // 得到一级节点的下标
              this.curNodeIndex = j - 1
              nodes = source[i].children
              break
            }
          }
        }
        if (this.firstIndex >= 0 && !(this.firstIndex === 0 && this.curNodeIndex === -1)) {
          if (this.curNodeIndex >= 0) {
            this.$refs.jzTree.setCurrentNode(nodes[this.curNodeIndex])
            this.UPDATE_CURNODE(nodes[this.curNodeIndex])
            if (this.firstIndex === 0 && this.curNodeIndex === 0) {
              this.UPDATE_PREARROW(false)
              this.UPDATE_NEXTARROW(true)
            } else {
              this.UPDATE_NEXTARROW(true)
            }
            let pdfUrl = `${ENV.PDF_ADDR}/static/pdfjs/web/viewer.html?file=${ENV.REMOTE_ADDR}/zjgl/zjlbml/${this.dwbm}/${this.bmsah}/${nodes[this.curNodeIndex].dzjzMlbh}/${nodes[this.curNodeIndex].dzjzWjbh}`
            this.UPDATE_PDFURL(pdfUrl)
          } else if (this.curNodeIndex < 0) {
            this.firstIndex = this.firstIndex - 1
            if (this.firstIndex < 0 && this.curNodeIndex === 0) {
              this.UPDATE_PREARROW(false)
            } else {
              this.UPDATE_PREARROW(true)
            }
            let expandArr = []
            expandArr.push(source[this.firstIndex].id)
            this.UPDATE_EXPANDFZNODE(expandArr)
            nodes = source[this.firstIndex].children
            this.curNodeIndex = nodes.length - 1
            this.$refs.jzTree.setCurrentNode(nodes[nodes.length - 1])
            this.UPDATE_CURNODE(nodes[nodes.length - 1])
            let pdfUrl = `${ENV.PDF_ADDR}/static/pdfjs/web/viewer.html?file=${ENV.REMOTE_ADDR}/zjgl/zjlbml/${this.dwbm}/${this.bmsah}/${nodes[nodes.length - 1].dzjzMlbh}/${nodes[nodes.length - 1].dzjzWjbh}`
            this.UPDATE_PDFURL(pdfUrl)
          }
        }
      }
    })
  },
  watch: {
    yzFilterText (val) {
      // debugger
      if (!val || (val.trim().length === 0 && this.treeMark < 1)) {
        this.UPDATE_FORBIDPAGE(false)
      } else if (val.trim().length > 0 && this.treeMark < 1) {
        this.UPDATE_FORBIDPAGE(true)
      }
      this.$refs.jzTree.filter(val)
    }
  },
  updated () {
    this.$refs.jzTree.setCurrentNode(this.jztreeData[0].children[0])
  },
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      firstIndex: '',
      curNodeIndex: '',
      yzFilterText: ''
    }
  },
  computed: {
    ...vuex.mapState(['bmsah', 'dwbm', 'curNode']),
    ...pdf.mapState(['jztreeData', 'treeMark', 'expandysnode', 'selectjznode', 'forbidPage'])
  },
  methods: {
    ...pdf.mapActions(['getJzTreeData', 'handleNode']),
    ...vuex.mapMutations(['UPDATE_CURNODE', 'UPDATE_PDFURL']),
    ...pdf.mapMutations(['UPDATE_TREEMARK', 'UPDATE_ISCUTPICTURE', 'UPDATE_CLZTINDEX', 'UPDATE_PREARROW', 'UPDATE_NEXTARROW', 'UPDATE_FORBIDPAGE', 'UPDATE_EXPANDYSNODE', 'SET_ISLOAD']),
    ...ptzjsc.mapMutations(['UPDATEEVIDEXPAND', 'UPDATE_LINKTREE']),
    nodeClick (node) {
      if (!node.children || node.children.length <= 0) {
        this.UPDATE_TREEMARK(0)
        this.UPDATE_CURNODE(node)
        this.UPDATE_ISCUTPICTURE(false)
        this.UPDATEEVIDEXPAND(false)
        this.UPDATE_CLZTINDEX('')
        let pdfUrl = `${ENV.PDF_ADDR}/static/pdfjs/web/viewer.html?file=${ENV.REMOTE_ADDR}/yjfz/dzjzym/${this.dwbm}/${this.bmsah}/${node.dzjzMlbh}/${node.dzjzWjbh}`
        this.UPDATE_PDFURL(pdfUrl)
        this.handleNode(node)
      }
    },
    filterNode (value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    },
    handleNodeClick (node, data, event) {
      let source = null
      if (!node.children || node.children.length <= 0) {
        source = node
        this.UPDATE_CURNODE(source)
        this.UPDATE_TREEMARK(0)
        let pdfUrl = `${ENV.PDF_ADDR}/static/pdfjs/web/viewer.html?file=${ENV.REMOTE_ADDR}/zjgl/zjlbml/${this.dwbm}/${this.bmsah}/${source.dzjzMlbh}/${source.dzjzWjbh}`
        this.SET_ISLOAD(true)
        this.UPDATE_PDFURL(pdfUrl)
        this.handleNode({node: node, parent: data.parent})
        this.UPDATE_LINKTREE(false)
        this.$eventbus.emit('linkptfztpold', {ajzjclfy: node.ajzjclfy})
        if (!this.yzFilterText || (this.yzFilterText.trim().length === 0 && this.forbidPage)) {
          this.UPDATE_FORBIDPAGE(false)
        } else if (this.yzFilterText.trim().length > 0) {
          this.UPDATE_FORBIDPAGE(true)
        }
      }
    },
    renderContent (h, { node, data, store }) {
      let wen = {}
      let fei = {}
      let yi = {}
      let xia = {}
      if (data.zjbzlxlist && data.zjbzlxlist.length > 0) {
        data.zjbzlxlist.forEach(function (element) {
          switch (element.zjbzlxbh) {
            case 'A72DE561E5F04AD4ADF95246CE611F90':
              fei.show = true
              fei.count = element.count
              break
            case 'CDCC211A4E3241148A77E357ACF81945':
              xia.show = true
              xia.count = element.count
              break
            case '6F5CBC7210C046CC9883D6F97D788DEA':
              yi.show = true
              yi.count = element.count
              break
            case '0985F20B6D98449981FB86DB7BD063BD':
              wen.show = true
              wen.count = element.count
              break
          }
        })
      }
      return (
        <span style="width:calc(100% - 24px)">
          {data.children && data.children.length > 0 ? (
            <img
              style="color:#0f82c3;float:left;margin:5px 3px"
              src="/static/images/proofToCaseHanding/textword.png"
            />
          ) : (
            <img
              style="color:#0f82c3;float:left;margin:3px"
              src="/static/images/proofToCaseHanding/text.png"
            />
          ) }
          <span
            title={node.label}
            style="display: inline-block;text-align:left; font-size:14px;line-height:21px;float:left;width:calc(100% - 108px);overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
          >
            {node.label}
          </span>
        </span>
      )
    },
    tpl (node, ctx) {
      // let titleClass = node.selected ? 'node-title node-selected' : 'node-title'
      // if (node.searched) titleClass += ' node-searched'
      // return (<span> <button style='color:blue; background-color:pink' onClick={() => this.$refs.tree.addNode(node, {title: node.title})}>+</button>
      //   <span class={titleClass} domPropsInnerHTML={node.title} onClick={() => {
      //     ctx.parent.nodeSelected(ctx.props.node)
      //   }}></span>
      //      </span>
      // )
    }
  }
}
</script>
<style scoped>
.jztree{
  height: calc(100% - 1px);
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  border-left: 1px solid #ddd;
}
.js-input{
  width: 80%;
  margin: 10px 10% 10px;
}
</style>
<style>
.jztree .el-input{
  float: left
}
</style>

