import BaseApiController from '@/config/api/baseapi'
/**
 * @class pdf模块
 */
class PtzjscApiController extends BaseApiController {
  /*
  * @method 这里我们只做演示
  * @description 假设这里有很复杂的前端逻辑
  */
  async initContent (bh, ajxxbh) {
    let data = await this.get([this.ptzjsc.initContentUrl, bh, ajxxbh].join('/'))
    return data.data
  }
   /*
  * @method 获取材料分组的数据
  * @description 假设这里有很复杂的前端逻辑
  */
  getfzclData (ajxxbh, ajzjclbh) {
    return this.get([this.pdfs.getfzclDataUrl, ajxxbh, ajzjclbh].join('/'))
  }
   /*
  * @method 这里我们只做演示
  * @description 假设这里有很复杂的前端逻辑
  */
  async getzjlb () {
    let data = await this.get(this.ptzjsc.getzjlbUrl)
    return data.data
  }
   /*
  * @method 这里我们只做演示
  * @description 假设这里有很复杂的前端逻辑
  */
  updatezjlb (bh, zjlbbh) {
    return this.get([this.ptzjsc.updatezjlbUrl, bh, zjlbbh].join('/'))
  }
    /*
  * @method 这里我们只做演示
  * @description 假设这里有很复杂的前端逻辑
  */
  async getsazmArr () {
    let res = await this.get([this.jyzjsc.getsazmArrUrl, 9903].join('/'))
    return res.data
  }
  /*
  * @method 这里我们只做演示
  * @description 假设这里有很复杂的前端逻辑
  */
  updatezjclmc (obj) {
    return this.post(this.ptzjsc.updatezjclmcUrl, obj)
  }
   /*
  * @method 这里我们只做演示
  * @description 假设这里有很复杂的前端逻辑
  */
  async editzjzy (obj) {
    let data = await this.post(this.ptzjsc.editzjzyUrl, obj)
    return data.data
  }
   /*
  * @method 获取关联人
  * @description 假设这里有很复杂的前端逻辑
  */
  getGlr (ajzjclbh, ajxxbh) {
    return this.get([this.ptzjsc.getGlrUrl, ajzjclbh, ajxxbh].join('/'))
    // return res.data
  }
   /*
  * @method 获取民族
  * @description 假设这里有很复杂的前端逻辑
  */
  async getMz () {
    let res = await this.get(this.ptzjsc.getMzUrl)
    return res.data
  }
   /*
  * @method 获取学历
  * @description 假设这里有很复杂的前端逻辑
  */
  async getWhcd () {
    let res = await this.get(this.ptzjsc.getWhcdUrl)
    return res.data
  }
   /*
  * @method 添加关联人
  * @description 假设这里有很复杂的前端逻辑
  */
  async addglr (obj) {
    let res = await this.post(this.ptzjsc.addglrUrl, obj)
    return res.data
  }
   /*
  * @method 添加关联人
  * @description 假设这里有很复杂的前端逻辑
  */
  async editglr (obj) {
    let res = await this.post(this.ptzjsc.editGlrUrl, obj)
    return res.data
  }
   /*
  * @method 勾选关联人
  * @description 假设这里有很复杂的前端逻辑
  */
  async glrCheck (obj) {
    let res = await this.post(this.ptzjsc.glrCheckUrl, obj)
    return res.data
  }
   /*
  * @method 反选关联人
  * @description 假设这里有很复杂的前端逻辑
  */
  async glrCancelCheck (obj) {
    let res = await this.post(this.ptzjsc.glrCancelCheckUrl, obj)
    return res.data
  }
   /*
  * @method 删除关联人
  * @description 假设这里有很复杂的前端逻辑
  */
  async delPeople (obj, sfscglss) {
    let res = await this.post(this.ptzjsc.delPeopleUrl + sfscglss, obj)
    return res.data
  }
   /*
  * @method 获取关联事实
  * @description 假设这里有很复杂的前端逻辑
  */
  async getglqj (ajzjclbh, ajxxbh) {
    let res = await this.get([this.ptzjsc.getglqjUrl, ajzjclbh, ajxxbh].join('/'))
    return res.data
  }
   /*
  * @method 获取关联事实
  * @description 假设这里有很复杂的前端逻辑
  */
  async getglss (ajzjclbh, ajxxbh) {
    let res = await this.get([this.ptzjsc.getglssUrl, ajzjclbh, ajxxbh].join('/'))
    return res.data
  }
   /*
  * @method 勾选关联事实
  * @description 假设这里有很复杂的前端逻辑
  */
  async chooseFzss (arg) {
    let res = await this.post(this.ptzjsc.chooseFzssUrl, arg)
    return res.data
  }
    /*
  * @method 勾选关联事实
  * @description 假设这里有很复杂的前端逻辑
  */
  cancelFzss (ajzjclbh, ajfzssqkbh) {
    return this.get([this.ptzjsc.cancelFzssUrl, ajzjclbh, ajfzssqkbh].join('/'))
  }
   /*
  * @method 判断是否存在关相同的联事实
  * @description 假设这里有很复杂的前端逻辑
  */
  findfzss (obj) {
    return this.post(this.ptzjsc.findfzssUrl, obj)
  }
   /*
  * @method 添加关联事实
  * @description 假设这里有很复杂的前端逻辑
  */
  addfzss (obj) {
    return this.post(this.ptzjsc.addfzssUrl, obj)
  }
  /*
  * @method 编辑关联事实
  * @description 假设这里有很复杂的前端逻辑
  */
  ptEditfzss (obj) {
    return this.post(this.ptzjsc.ptEditfzssUrl, obj)
  }
  /*
  * @method 添加关联事实
  * @description 假设这里有很复杂的前端逻辑
  */
  checkFzss (obj) {
    return this.post(this.ptzjsc.checkFzssUrl, obj)
  }
  /*
  * @method 删除关联事实
  * @description 假设这里有很复杂的前端逻辑
  */
  async deleteFzss (obj) {
    await this.post(this.ptzjsc.deleteFzssUrl, obj)
  }
  /*
  * @method 获取犯罪相关数据
  * @description 假设这里有很复杂的前端逻辑
  */
  async getzjscxx (obj) {
    let res = await this.post(this.ptzjsc.getzjscxxUrl, obj)
    return res.data
  }
  /*
  * @method 获取量刑情节树数据
  * @description 假设这里有很复杂的前端逻辑
  */
  async getlxqjTree () {
    let res = await this.get(this.ptzjsc.getlxqjTreeUrl)
    return res.data
  }
  /*
  * @method 获取证据指引数据
  * @description 假设这里有很复杂的前端逻辑
  */
  async getZjzy (ajxxbh, zjclbh, ajzjclbh) {
    let res = await this.get([this.ptzjsc.getZjzyUrl, ajxxbh, zjclbh, ajzjclbh].join('/'))
    return res.data
  }
   /*
  * @method 获取证据指引图片数据
  * @description 假设这里有很复杂的前端逻辑
  */
  async getimg (zjclbh) {
    let res = await this.get([this.ptzjsc.getimgUrl, zjclbh].join('/'))
    return res.data
  }
   /*
  * @method 获取摘要模板
  * @description 假设这里有很复杂的前端逻辑
  */
  async getzymbInfo (zjclbh, arg) {
    let res = await this.get([this.ptzjsc.getzymbInfoUrl, zjclbh, arg].join('/'))
    return res.data
  }
   /*
  * @method 获取摘要模板
  * @description 假设这里有很复杂的前端逻辑
  */
  async fzgetzymbInfo (zjclzhmbbh, aydm) {
    let res = await this.get([this.ptzjsc.fzgetzymbInfoUrl, zjclzhmbbh, aydm].join('/'))
    return res.data
  }
   /*
  * @method 摘要和分析的编辑保存
  * @description 假设这里有很复杂的前端逻辑
  */
  async editzjscxx (arg) {
    let res = await this.post(this.ptzjsc.editzjscxxUrl, arg)
    return res.data
  }
   /*
  * @method 证据指引的编辑
  * @description 假设这里有很复杂的前端逻辑
  */
  async editZjzy (arg) {
    let res = await this.post(this.ptzjsc.editZjzyUrl, arg)
    return res.data
  }
   /*
  * @method 证据指引的恢复
  * @description 假设这里有很复杂的前端逻辑
  */
  async ptzjzyHf (arg) {
    let res = await this.post(this.ptzjsc.ptzjzyHfUrl, arg)
    return res.data
  }
   /*
  * @method 添加量刑情节
  * @description 假设这里有很复杂的前端逻辑
  */
  async addLxqj (arg) {
    let res = await this.post(this.ptzjsc.addLxqjUrl, arg)
    return res.data
  }
   /*
  * @method 分组材料推荐
  * @description 假设这里有很复杂的前端逻辑
  */
  async getClState (ajxxbh, ajzjclbh) {
    let res = await this.get(this.ptzjsc.getClStateUrl + ajxxbh + '/' + ajzjclbh)
    return res.data
  }
   /*
  * @method 分组材料推荐
  * @description 假设这里有很复杂的前端逻辑
  */
  async fzcltj (ajxxbh, ajzjclbh) {
    let res = await this.get(this.ptzjsc.fzcltjUrl + ajxxbh + '/' + ajzjclbh)
    return res.data
  }
    /*
  * @method 分组材料勾选的保存
  * @description 假设这里有很复杂的前端逻辑
  */
  fzclSave (arg) {
    return this.post(this.ptzjsc.fzclSaveUrl, arg)
  }
    /*
  * @method 分组图片的获取
  * @description 假设这里有很复杂的前端逻辑
  */
  getFztp (ajxxbh, zjfzbh, ksys, jsys) {
    return this.get([this.ptzjsc.getFztpUrl, ajxxbh, zjfzbh, ksys, jsys].join('/'))
  }
    /*
  * @method 分组图片的获取新
  * @description 假设这里有很复杂的前端逻辑
  */
  getFztpnew (ajxxbh, zjfzbh, ksys, jsys) {
    return this.get([this.ptzjsc.getFztpUrl, ajxxbh, zjfzbh, ksys, jsys].join('/'))
  }
    /*
  * @method 分组图片的删除
  * @description 假设这里有很复杂的前端逻辑
  */
  delcltp (ajzjclbh, zjfzbh) {
    return this.get([this.ptzjsc.delcltpUrl, ajzjclbh, zjfzbh].join('/'))
  }
    /*
  * @method 获取分组关联人
  * @description 假设这里有很复杂的前端逻辑
  */
  async getfzGlr (obj) {
    let res = await this.post(this.ptzjsc.getfzGlrUrl, obj)
    return res.data
  }
    /*
  * @method 获取分组关联事实
  * @description 假设这里有很复杂的前端逻辑
  */
  async getfzglss (obj) {
    let res = await this.post(this.ptzjsc.getfzglssUrl, obj)
    return res.data
  }
    /*
  * @method 删除关联事实
  * @description 假设这里有很复杂的前端逻辑
  */
  ptdelfzss (ajfzssqkbh) {
    return this.post([this.ptzjsc.ptdelfzssUrl, ajfzssqkbh].join('/'))
  }
     /*
  * @method 添加关联事实
  * @description 假设这里有很复杂的前端逻辑
  */
  ptaddfzss (obj) {
    return this.post(this.ptzjsc.ptaddfzssUrl, obj)
  }
    /*
  * @method 分组关联人勾选
  * @description 假设这里有很复杂的前端逻辑
  */
  async fzglrCheck (obj) {
    let res = await this.post(this.ptzjsc.fzglrCheckUrl, obj)
    return res.data
  }
    /*
  * @method 分组关联人反选
  * @description 假设这里有很复杂的前端逻辑
  */
  async fzglrCancelCheck (obj) {
    let res = await this.post(this.ptzjsc.fzglrCancelCheckUrl, obj)
    return res.data
  }
   /*
  * @method 分组关联事实勾选
  * @description 假设这里有很复杂的前端逻辑
  */
  async fzchooseFzss (obj) {
    let res = await this.post(this.ptzjsc.fzchooseFzssUrl, obj)
    return res.data
  }
   /*
  * @method 分组关联事实反选
  * @description 假设这里有很复杂的前端逻辑
  */
  fzcancelFzss (obj) {
    return this.post(this.ptzjsc.fzcancelFzssUrl, obj)
  }
   /*
  * @method 分组摘要分析的编辑
  * @description 假设这里有很复杂的前端逻辑
  */
  async fzeditzjscxx (obj) {
    let res = await this.post(this.ptzjsc.fzeditzjscxxUrl, obj)
    return res.data
  }
}
export default new PtzjscApiController()
