import BaseApiController from '@/config/api/baseapi'
/**
 * @class pdf模块
 */
class PdfApiController extends BaseApiController {
  /*
  * @method 这里我们只做演示
  * @description 假设这里有很复杂的前端逻辑
  */
  async getSliderArr (bmsah) {
    let data = await this.get(this.pdfs.getSliderArrUrl + bmsah)
    return data.data
  }
   /*
  * @method 这里我们只做演示
  * @description 假设这里有很复杂的前端逻辑
  */
  refreshSliderArr (bmsah) {
    return this.get(this.pdfs.getSliderArrUrl + bmsah)
  }
  /*
  * @method 获取卷宗树数据
  * @description 假设这里有很复杂的前端逻辑
  */
  async getJzTreeData (dwbm, bmsah) {
    let data = await this.get([this.pdfs.getJzTreeDataUrl, dwbm, bmsah].join('/'))
    return data.data
  }
   /*
  * @method 获取证据树节点数据
  * @description 假设这里有很复杂的前端逻辑
  */
  getJzLeafNodes = (obj) => this.post(this.pdfs.getJzLeafNodesUrl, obj)
  /*
   * @method 获取证据文本数据
   * @description 假设这里有很复杂的前端逻辑
   */
  zjwbNode = (obj) => { return this.post(this.pdfs.zjwbNodeUrl, obj).then(res => res.data) }
  /*
   * @method 识别
   * @description 假设这里有很复杂的前端逻辑
   */
  shibie = (obj) => { return this.post(this.pdfs.shibieUrl, obj).then(res => res.data) }
   /*
  * @method 这里我们只做演示
  * @description 假设这里有很复杂的前端逻辑
  */
  async getJzTreeBh (bmsah, dzjzWjbh, dzjzMlbh) {
    let data = await this.post(this.jyzjsc.getJzTreeBhUrl, {bmsah: bmsah, dzjzwjbh: dzjzWjbh, dzjzmlbh: dzjzMlbh})
    return data.data
  }
    /*
  * @method 获取分组卷宗数据
  * @description 假设这里有很复杂的前端逻辑
  */
  async groupTree (ajxxbh) {
    let data = await this.get(this.pdfs.groupTreeUrl + ajxxbh)
    return data.data
  }
   /*
  * @method 刷新分组卷宗数据
  * @description 假设这里有很复杂的前端逻辑
  */
  refreshTree (ajxxbh) {
    return this.get(this.pdfs.groupTreeUrl + ajxxbh)
  }
     /*
  * @method 获取材料分组的数据
  * @description 假设这里有很复杂的前端逻辑
  */
  async getfzclData (ajxxbh, ajzjclbh) {
    let data = await this.get([this.pdfs.getfzclDataUrl, ajxxbh, ajzjclbh].join('/'))
    return data.data
  }
      /*
  * @method 获取材料分组的数据
  * @description 假设这里有很复杂的前端逻辑
  */
  saveFz (arr) {
    return this.post(this.pdfs.saveFzUrl, arr)
  }
     /*
  * @method 编辑分组名称
  * @description 假设这里有很复杂的前端逻辑
  */
  saveeditfzmc (zjfzbh, ajxxbh, zjfzmc) {
    return this.get([this.pdfs.saveeditfzmcUrl, zjfzbh, ajxxbh, zjfzmc].join('/'))
  }
 /*
  * @method 删除一条材料分组的数据
  * @description 假设这里有很复杂的前端逻辑
  */
  clFzDel (zjfzbh) {
    return this.get(this.pdfs.clFzDelUrl + zjfzbh)
  }
  /*
  * @method 添加一条材料分组的数据
  * @description 假设这里有很复杂的前端逻辑
  */
  clFzAdd (arg) {
    return this.post(this.pdfs.clFzAddUrl, arg)
  }
   /*
  * @method 查询当前材料状态
  * @description 假设这里有很复杂的前端逻辑
  */
  async getclStateInfo (ajxxbh, ajzjclbh, mark, bmsah) {
    let res = await this.get([this.pdfs.getclStateInfoUrl, ajxxbh, ajzjclbh, mark, bmsah].join('/'))
    return res.data
  }
   /*
  * @method 截图保存
  * @description 假设这里有很复杂的前端逻辑
  */
  async pdfCutImg (obj) {
    await this.post(this.pdfs.pdfCutImgUrl, obj)
  }
   /*
  * @method 获取情节数据
  * @description 假设这里有很复杂的前端逻辑
  */
  async getQjData (obj) {
    let res = await this.post(this.pdfs.getQjDataUrl, obj)
    return res.data
  }
   /*
  * @method 获取情节数据
  * @description 假设这里有很复杂的前端逻辑
  */
  async getAydmAndAymc (ajxxbh) {
    let res = await this.get([this.pdfs.getAydmAndAymcUrl, ajxxbh].join('/'))
    return res.data
  }
  /*
  * @method 获取情节数据
  * @description 假设这里有很复杂的前端逻辑
  */
  async getpzlx (ajxxbh) {
    let res = await this.get(this.pdfs.getpzlxUrl)
    return res.data
  }
   /*
  * @method 保存情节
  * @description 假设这里有很复杂的前端逻辑
  */
  saveQj (obj) {
    return this.post(this.pdfs.saveQjUrl, obj)
  }
    /*
  * @method 获取截图标准类型
  * @description 假设这里有很复杂的前端逻辑
  */
  async getjtbzlx () {
    let res = await this.get(this.pdfs.getjtbzlxUrl)
    return res.data
  }
    /*
  * @method 获取情节图片
  * @description 假设这里有很复杂的前端逻辑
  */
  async getqjtp (qjbh, bmsah) {
    return this.get([this.pdfs.getqjtpUrl, qjbh, bmsah].join('/'))
  }
}
export default new PdfApiController()
