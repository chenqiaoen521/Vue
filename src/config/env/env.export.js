/**
 *  此文件无需开发者关注
 */
var conf = process.env.NODE_ENV === 'development' ? window.devConf : window.proConf
console.info('配置输出')
console.info(JSON.stringify(conf))
export default conf
