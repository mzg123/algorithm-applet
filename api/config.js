var plugin = requirePlugin('szsf-wz-plugin');
//api地址
//const host="http://106.120.68.109:8199/api/";
const walletPath = 'payment/wallet/'
// const host="https://api.nbpark.online/api/";
const host = "https://didev.dccnet.com.cn:8080/api/"
//方法地址
const urls={
  getID:host+"basic/get",
  getSign:host+"basic/sign",
  sendSignMsg:host+"basic/sign/smscode",
  sendApply:host+"basic/uniteapply",
  //getXID:host+"basic/xid/query",
  getQRcode:host+"basic/qrcode/generate",
  //getIDinfo:host+"data/identity/query",
  getOtherID:host+"basic/other/get",
  getOtherSign:host+"basic/other/sign",
  getOtherList:host+"basic/other/list",
  getOtherQRcode:host+"basic/other/qrcode/generate",
  delOtherID:host+"basic/other/delete",

  //获取权限菜单
  getMenu:host+"manage/functionInfo/v1/getByAppid",
  //图片转base64
  imagetobase64:host+"basicFile/imagetobase64",
  //检查状态
  checkStatus:host+"basic/bid/status",  
  //获取appId及orgId
  getCtidInfo:host+"manage/getct/ctlist",
  //e钱包绑定银行卡
  eWalletBind:host+walletPath+"ewallet/bind",
  //e钱包绑卡状态查询
  eWalletStatusQuery:host+walletPath+"ewallet/bind/query",
  //e钱包充值
  eWalletRecharge:host+walletPath+"ewallet/recharge",
  //e钱包提现
  eWalletWithdraw:host+walletPath+"ewallet/withdraw",
  //电子钱包状态检验与初始化信息
  walletInit:host+walletPath+"account/check",
  //银行卡列表查询
  bankCardListQuery:host+walletPath+"bankcard/query",
  //银行卡信息详情
  bankCardDetail:host+walletPath+"bankcard/detail",
  //银行卡解绑e钱包和免秘协议解除
  bacnCardUnbinging:host+walletPath+"bankcard/unbinging",
  //免密验证码发送
  nspaySendSms:host+walletPath+"nspay/sendSms",
  //免密签约
  nspaySign:host+walletPath+"nspay/sign",
  //安全密码设置
  setSecurityCode:host+walletPath+"security/setSecurityCode",
  //是否设置安全密码
  securityCodeQuery:host+walletPath+"security/securityCodeState/query",
  //安全密码验证
  verifySecurityCode:host+walletPath+"security/verifySecurityCode",
  //e钱包开通时生成的短信验证码
  openVerifyCode:host+walletPath+"ewallet/account/openVerifyCode",
  //e钱包开通
  eWalletOpen:host+walletPath+"ewallet/account/open",
  //e钱包是否开通
  eWalletIsOpen:host+walletPath+"ewallet/account/isOpenWallet",
  //ocr识别接口
  eWalletOCRinfo:host+walletPath+"account/OCRinfo",
  //e钱包余额查询
  eWalletBlanceQuery:host+walletPath+"ewallet/balance/query",
  //e钱包是否绑定查询
  eWalletisBindCard:host+walletPath+"ewallet/isBindCard/query",
  //查询卡类型
  cardTypeQuery:host+walletPath+"cardType/query",
  //人脸验证
  verifyFace: host+walletPath+"faceImage/verify",
  //验证码重发
  eWalletSendMsgRepeat: host+walletPath+"verifyCode/resend",
  //充值或者提现状态查询
  eWalletTransferStatus: host+walletPath+ 'ewallet/transferStatus'
}
//3DES加密key （目前加密长度的问题，大于8位,解密时出现性能问题）
const encryptKey='0312XaszsfGykj1234567890';
//const encryptKey='123456789012345678901234';
export {
  host,
  urls,
  encryptKey,
  plugin
}