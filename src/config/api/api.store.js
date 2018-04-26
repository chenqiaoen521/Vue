/**
 * @description 各个服务模块统一仓储
 */
import demo from '@/fetch/demo-api'
import pdfs from '@/fetch/pdf-api'
import ptzjsc from '@/fetch/ptzjsc-api'
export const apistore = {
  demo,
  pdfs,
  ptzjsc
}
