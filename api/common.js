import { base } from './base';
import { szsfServer } from './server'
import { urls, plugin } from './config';
const data = require("../data")
const szServer=new szsfServer(data.szsf);

export async function getMenu() {
  return await base.post(urls.getMenu, {appId: data.szsf.appId});
}
export async function validFace(faceData, privacyKeys) {
  var type = 0
  const { ctidAppId, ctidOrgId, openId, deviceId, deviceName } = data.szsf
  var applydata = new plugin.ApplyData(ctidAppId,ctidOrgId,type)
  var applydataResult=plugin.getApplydata(applydata);
  var param={
    bizType:'5002',
    applyData:applydataResult.value,
    openId:openId,
    deviceId:deviceId
  }
  let result = await szServer.sendApply(param)
  if (result.retCode=='0') {
    let IdOpenCardData = new plugin.IdCardData(ctidAppId, ctidOrgId,result.data.ctid,0);
    let pluginResult = plugin.getAuthIDCardData(result.data.randomNum,IdOpenCardData);
    const p = {
      carrierTypeId:3, 
      deviceId: deviceId,
      deviceName: deviceName,
      idcardAuthData: pluginResult.value,
      bsn: result.data.bsn,
      privacyKeys
      // userFaceImg: faceData.img
    }
    result = await base.request(urls.verifyFace, p, {apiType: 'financial', userFile: {userFaceImg: faceData.img}});
  }
  return result
}
export async function image2Base64(data) {
  return await base.image2Base64(urls.imagetobase64, data, true);
  return  new Promise((resolve,reject)=>{
    wx.uploadFile({
      url: 'http://81.70.210.249:9999/api/basic/imagetobase64',//urls.imagetobase64,
      filePath: data.image,
      name: 'file',
      success (res){
        const data = JSON.parse(res.data)
        resolve(data)
      },
      fail(error) {
        reject(error)
      },
    })
  })
  
}

export async function sendSignMsg(data){
  // return await base.post(urls.sendSignMsg,data)
  return  new Promise((resolve,reject)=>{
    resolve({
      retCode: 0,
      retMsg: '9999'
    })
  });
}

export async function sendAddBankMsg(data){
  return await base.request(urls.nspaySendSms,data, {apiType: 'financial'});
  return  new Promise((resolve,reject)=>{
    resolve({
      retCode: 0,
      retMsg: '9999',
      data: '',
      verifyCode: 123
    })
  });
}
