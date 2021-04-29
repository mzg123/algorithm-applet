import { base } from '../../base';
import { urls } from '../../config';

export async function getBackCardList(data) {
  return await base.request(urls.bankCardListQuery,data, {apiType: 'financial'});
  return  new Promise((resolve,reject)=>{
    resolve({
      retCode: '0',
      retMsg: 'error',
      data: {
        list: [
          {
            bankName: '工商银行',
            cardId: '88888888888888888',
            bankCard: '***********88888',
            cardType: '1',
            cardId: 1,
            bankNo: '1234',
            bankIcon: '',
            bindStatus: '1'
          },
          {
            bankName: '工商银行',
            cardId: '88888888888888888',
            bankCard: '***********88888',
            cardType: '2',
            cardId: 2,
            bankNo: '1234',
            bindStatus: '1'
          },
         
        ]
      }

    })
  });
}
export async function getBackCardDetail(data) {
  return await base.request(urls.bankCardDetail,data, {apiType: 'financial'});
  return  new Promise((resolve,reject)=>{
    resolve({
      retCode: '0',
      retMsg: 'error',
      data: {
          deBankCard: '8***********88888',
          enBankCard: '88888888888888888',
          cardId: '88888888888888888',
        }
    })
  });
}
export async function unbind(data) {
  return await base.request(urls.bacnCardUnbinging,data, {apiType: 'financial'});
}
export async function getBankCarNumByImg(data) {
  return await base.request(urls.eWalletOCRinfo, {type: data.type}, {apiType: 'financial', userFile: {cardImg: data.cardImg}});
  return  new Promise((resolve,reject)=>{
    resolve({
      retCode: 0,
      retMsg: '9999',
      cardNo: '3333',
      cardType: '222',
      cardName: '3333',
      bankName: '2222',
      bankNo: '3333'
    })
  });
}



export async function getCardType(data) {
  return await base.request(urls.cardTypeQuery,data, {apiType: 'financial'});
  return  new Promise((resolve,reject)=>{
    resolve({
      retCode: 0,
      retMsg: '9999',
      cardType: 1,
      cardNo: '33',
      cardType: '1',
      cardName: '3',
      bankName: '3',
      bankNo: '3',
      partnerFlag: 1,
    })
  });
}


export async function verifyPassWord(data) {
  wx.showLoading()
  const result = await base.request(urls.verifySecurityCode,data, {apiType: 'financial'});
  wx.hideLoading()
  return result
  return  new Promise((resolve,reject)=>{
    resolve({
      retCode: 0,
      retMsg: '9999'
    })
  });
}

/**
 * 同意并绑卡
 */
export async function nspaySign(data) {
  return await base.request(urls.nspaySign,data, {apiType: 'financial'});
  return  new Promise((resolve,reject)=>{
    resolve({
      retCode: 0,
      retMsg: '缺少必要参数'
    })
  });
}
export async function hasSetPassWord() {
   return await base.request(urls.securityCodeQuery,{}, {apiType: 'financial'});
   return  new Promise((resolve,reject)=>{
    resolve({
      retCode: 0,
      retMsg: '缺少必要参数'
    })
  });
}


