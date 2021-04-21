import { base } from '../../base';
import { urls } from '../../config';

//余额开通状态查询
async function eWalletIsOpen(data){
  return await base.request(urls.eWalletIsOpen,data,{apiType: 'financial'});
}
// OCR接口识别
async function eWalletOCRinfo(data, userFile){
  return await base.request(urls.eWalletOCRinfo,data,{apiType: 'financial', userFile});
}
// E钱包开通验证码
async function openVerifyCode(data, userFile){
  return await base.request(urls.openVerifyCode,data,{apiType: 'financial', userFile});
}

// E钱包开通
async function eWalletOpen(data){
  return await base.request(urls.eWalletOpen,data,{apiType: 'financial'});
}

// E钱包余额查询
async function eWalletBlanceQuery(data){
  return await base.request(urls.eWalletBlanceQuery,data,{apiType: 'financial'});
}

// E钱包是否绑卡
async function eWalletisBindCard(data){
  return await base.request(urls.eWalletisBindCard,data,{apiType: 'financial'});
}

// E钱包绑卡状态查询
async function eWalletStatusQuery(data){
  return await base.request(urls.eWalletStatusQuery,data,{apiType: 'financial'});
}
// E钱包绑卡
async function eWalletBind(data){
  return await base.request(urls.eWalletBind,data,{apiType: 'financial'});
}
// E钱包充值
async function eWalletRecharge(data){
  return await base.request(urls.eWalletRecharge,data,{apiType: 'financial'});
  // return  new Promise((resolve,reject)=>{
  //   resolve({
  //     retCode: 0,
  //     retMsg: '缺少必要参数'
  //   })
  // });
}

// E钱包提现
async function eWalletWithdraw(data){
  return await base.request(urls.eWalletWithdraw,data,{apiType: 'financial'});
  // return  new Promise((resolve,reject)=>{
  //   resolve({
  //     retCode: 0,
  //     retMsg: '缺少必要参数'
  //   })
  // });
}

// 银行卡查询列表
async function bankCardListQuery(data){
  return await base.request(urls.bankCardListQuery,data,{apiType: 'financial'});
}
//e钱包验证码重发
async function eWalletSendMsgRepeat(data) {
  return await base.request(urls.eWalletSendMsgRepeat,data,{apiType: 'financial'});
}
//e钱包充值/提现结果信息查询
async function eWalletTransferStatus(data) {
  return await base.request(urls.eWalletTransferStatus,data,{apiType: 'financial'});
}

export {
  eWalletBind,
  eWalletIsOpen,
  eWalletOCRinfo,
  openVerifyCode,
  eWalletOpen,
  eWalletBlanceQuery,
  eWalletisBindCard,
  eWalletStatusQuery,
  eWalletRecharge,
  eWalletWithdraw,
  bankCardListQuery,
  eWalletSendMsgRepeat,
  eWalletTransferStatus
}