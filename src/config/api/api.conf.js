export const demo = {
  test: '/api/test' // 测试请求路径
}

export const pdfs = {
  // getSliderArrUrl: '/zjgl/zjtree/getzgxx/', // 获取证据树
  // getSliderArrUrl: '/zjgl/zjlbml/', // 获取证据树
  getSliderArrUrl: '/zjgl/zjtree/getzgxx/',
  getJzTreeDataUrl: '/yjfz/dzjzml', // 获取卷宗树数据
  getJzLeafNodesUrl: '/zjgl/zjtree/getfyxx', // 异步获取证据树节点
  zjwbNodeUrl: '/zjgl/getpdftext', // 获取证据文本数据
  shibieUrl: '/zjgl/zb', // 获取证据文本数据
  groupTreeUrl: '/zjclsc/getgroupmater/', // 获取分组卷宗数据
  getfzclDataUrl: '/zjclsc/getgroupinfo', // 获取材料分组数据
  saveFzUrl: '/zjclsc/savegroupzjfz', // 分组材料勾选之后的确定
  saveeditfzmcUrl: '/ajscn/updateMCByAjxxAndZjfz', // 编辑分组名称
  clFzDelUrl: '/zjclsc/delgroupinfo/', // 分组材料的删除
  clFzAddUrl: '/zjclsc/addgroupinfo', // 分组材料的添加
  getclStateInfoUrl: '/zjscn/hqdqbzbzxx/GetMaterialSigns', // 查询材料状态信息
  pdfCutImgUrl: '/zjscn/zjbzhu/addmaterialsign', // 截图保存
  getQjDataUrl: '/zjscn/findscqj', // 获取情节数据
  saveQjUrl: '/zjscn/zjbzhu/addmaterialsign', // 保存情节
  getjtbzlxUrl: '/zjclsc/getbzlx', // 获取截图标准类型
  getAydmAndAymcUrl: '/zjscn/getAy_dmAndAy_mc', // 获取当前案由
  getqjtpUrl: '/zjscn/getqjnbyid', // 获取情节图片
  getpzlxUrl: '/zjscn/zjbzhu/zjbzctsc' // 获取标注类型
}

export const ptzjsc = { // 普通模式的证据审查
  initContentUrl: '/dzjz/zjxxsc', // 获取普通模式的证据审查的材料信息
  getzjlbUrl: '/zjgl/zjlb', // 获取下拉的证据类别
  updatezjlbUrl: '/zjgl/updatezjlb', // 更新证据类别
  updatezjclmcUrl: '/zjgl/updateajzjclmc', // 更新证据材料名称
  editzjzyUrl: '/zjgl/editzjzy', // 编辑摘要
  getZjzyUrl: 'zjclsc/zjsczy', // 获取证据指引数据
  getimgUrl: '/zjgl/zjscyl', // 证据指引图标地址
  getGlrUrl: '/zjscn/findsaryandqj', // 获取嫌疑人和被害人
  getMzUrl: 'ajbl/getallMz', // 获取所有民族列表
  getWhcdUrl: '/ajbl/getallXl', // 获取学历列表
  addglrUrl: '/ajbl/insertsaryxx', // 添加嫌疑人被害人
  editGlrUrl: '/ajbl/updatesary', // 编辑关联人
  glrCheckUrl: '/zjscn/createsarycl', // 勾选关联人
  glrCancelCheckUrl: '/zjscn/delsarycl', // 反选关联人
  getglssUrl: '/zjscn/findfzssbyajzjcl', // 获取犯罪事实
  findfzssUrl: '/ajbl/findfzss', // 判断犯罪事实是否相同
  ptaddfzssUrl: '/zjclsc/addfzssn', // 添加犯罪事实
  ptEditfzssUrl: '/zjclsc/updatafzssmc', // 编辑犯罪事实
  ptdelfzssUrl: '/zjclsc/delfzssbyid', // 删除犯罪事实
  chooseFzssUrl: '/zjscn/createfzsscl', // 勾选犯罪事实
  cancelFzssUrl: '/zjscn/delsarycl', // 反选犯罪事实
  getzjscxxUrl: '/aj/ajbl/getzjscxx', // 获取犯罪事实关联数据
  getglqjUrl: '/zjscn/findsaryandqj', // 获取关联情节数据
  editzjscxxUrl: '/zjscn/updatazynrorfx', // 摘要和分析的编辑保存
  getzymbInfoUrl: '/zjclsc/getzjzymb', // 获取模板摘要数据
  // ptgetzjzyUrl: '/zjgl/zjscylzybyajzjcl', // 获取证据指引
  editZjzyUrl: '/zjclsc/savezjclsc', // 证据指引的编辑
  ptzjzyHfUrl: '/zjgl/deltzjscylzybl', // 证据指引恢复
  addLxqjUrl: '/ajbl/saveqjbat', // 添加量刑情节
  getClStateUrl: '/zjclsc/getsfzhzj/', // 判断当前材料是否有分组
  fzcltjUrl: '/zjclfz/ajzjcln/getrecommendgroupinfo/', // 分组材料推荐的获取
  fzclSaveUrl: '/zjclfz/ajzjcln/getrecommendgroupinfo', // 分组材料勾选的保存
  getFztpUrl: '/zjscn/ajzjclfytp/GetGroupImagesInfo', // 分组图片的获取
  delcltpUrl: '/zjscn/delzjclfzgx', // 分组图片的删除
  getfzGlrUrl: '/zjscn/findfzsary', // 获取分组关联人
  getfzglssUrl: '/zjscn/findfzfzss', // 获取分组关联事实
  fzglrCheckUrl: '/zjscn/savefzsarycl', // 分组关联人勾选
  fzglrCancelCheckUrl: '/zjscn/delfzsarycl', // 分组关联人反选
  fzchooseFzssUrl: '/zjscn/savefzfzsscl', // 分组关联事实勾选
  fzcancelFzssUrl: '/zjscn/delfzfzsscl', // 分组关联事实反选
  fzeditzjscxxUrl: '/zjscn/updatafzzynrorfx', // 分组摘要分析的编辑
  fzgetzymbInfoUrl: '/zjclsc/getzjzymbfz' // 获取分组模板摘要数据
}
