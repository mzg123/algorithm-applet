import { menu } from '../data'
import { cardFormat } from './regExp'

/**
 * 验证菜单权限
 * 9999 默认
 * 0010 他人身份
 * 0020 身份冻结
 * 0030 注销身份
 * 0040 载体管理
 * 0050 零钱包
 * 0060 银行卡（新型无卡支付）
 * 0070 数字人民币
 * 0080 电子钱包
 */
function hasAuth(code) {
  if (!menu || !code) return false
  const item = menu.list.find((item) => item.functionCode === code)
  if (!item) return false
  return item.enable === '1'
}

export {
  hasAuth,
  cardFormat
}