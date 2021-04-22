import { 
  getBackCardList,
  getBackCardDetail,
  unbind,
  getBankCarNumByImg,
  getCardType,
  verifyPassWord,
  hasSetPassWord,
  nspaySign
 } from './bankCard';
import { base } from '../../base';
import { urls } from '../../config';

async function initWallet(data) {
  return await base.request(urls.walletInit,data, {apiType: 'financial'});
  return  new Promise((resolve,reject)=>{
    resolve({
      retCode: 0,
      retMsg: '9999'
    })
  });
}

export {
  getBackCardList,
  getBackCardDetail,
  unbind,
  getBankCarNumByImg,
  verifyPassWord,
  initWallet,
  getCardType,
  hasSetPassWord,
  nspaySign
}