

let CryptoJS = require("crypto.min.js");
const data = require("../data")
import { encryptKey } from './config'

//初始化参数及签名
let initParam={
  appId:'',
  channel:3,
  msgId:'',
  timestamp:'',
  sign:'',
  deviceId:'',//设备id
  deviceName:'',//设备名称
  openId:'',//数字身份openId
  organizeId:'',//组织机构id
  accessToken:'',//用户accesToken
  signUrl:'', //签名地址
  verifySignUrl:''//验签地址
};
//api地址
// const host="http://106.120.68.109:8199/api/";
// const host="https://api.nbpark.online/api/";
// //方法地址
// const urls={
//   getID:host+"basic/get",
//   getSign:host+"basic/sign",
//   sendSignMsg:host+"basic/sign/smscode",
//   sendApply:host+"basic/uniteapply",
//   //getXID:host+"basic/xid/query",
//   getQRcode:host+"basic/qrcode/generate",
//   //getIDinfo:host+"data/identity/query",
  
// }
//3DES加密key （目前加密长度的问题，大于8位,解密时出现性能问题）
// const encryptKey='123456789012345678901234';
 //3DES加密
function encryptMsg(message){
  //加解密示例 
  var encrypted = CryptoJS.TripleDES.encrypt(message, CryptoJS.enc.Utf8.parse(encryptKey), { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }).ciphertext
  encrypted = CryptoJS.enc.Base64.stringify(encrypted);
  return encrypted;
}
//3DES解密
function decryptMsg(message){
  var decrypted = CryptoJS.TripleDES.decrypt({
    ciphertext: CryptoJS.enc.Base64.parse(message)
  }, CryptoJS.enc.Utf8.parse(encryptKey), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

 //生成日期
 function getNowFormatDate() {
  var date = new Date();
  var line = "-";
  var colon = ":";
  var month = date.getMonth() + 1;
  var curDate = date.getDate();
  var curHours = date.getHours();
  var curMinutes = date.getMinutes();
  var curSeconds = date.getSeconds();

  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (curDate >= 0 && curDate <= 9) {
    curDate = "0" + curDate;
  }
  if (curHours >= 0 && curHours <= 9) {
    curHours = "0" + curHours;
  }
  if (curMinutes >= 0 && curMinutes <= 9) {
    curMinutes = "0" + curMinutes;
  }
  if (curSeconds >= 0 && curSeconds <= 9) {
    curSeconds = "0" + curSeconds;
  }

  var currentdate = date.getFullYear() + line + month + line + curDate
          + " " + curHours + colon + curMinutes
          + colon + curSeconds;
  return currentdate;
}
//生成msgId,长度16-32位
function getMsgId(){
  //13位时间戳
  var timestamp=new Date().getTime();
  //生成3位随机值
  var num = '';
  for(var i=0;i<3;i++){
    num+=Math.floor(Math.random()*10);
  }
  return timestamp+''+num;
}

/**
 * szsfServer方法,其它方法放在外部用于隔离
 */
class szsfServer{
  constructor(param) {
    this.initParam=param;
    initParam=param;
  }
  async request(url, data, option={}){
    if (option.apiType) {
      return this.post(url, data, option.userFile, option.apiType)
    } else if (option.userFile){
      return this.post(url, data, option.userFile)
    } else {
      return this.post(url, data)
    }
  }
  async post(url,data,userFile= {}, apiType = ''){
    let param={
      appId:initParam.appId,
      orgId:initParam.orgId,
      channel:initParam.channel,
      msgId:getMsgId(),
      timestamp:getNowFormatDate(),
    }
    //金融相关参数
    if (apiType == 'financial') {
      data.openId = initParam.openId
    }
    try{
      //第一步：数据签名
      let resSign= await this.signData(initParam.signUrl,param);
      if(resSign.retCode==='0'){
        let cryptStr="";
        let paramData={};

          cryptStr=encryptMsg(JSON.stringify(data));
          paramData={
            ...param,
            openId:initParam.openId,
            sign:resSign.sign,
            data:cryptStr,
            file: userFile
          }
        console.log('发送的数据', paramData, param, data)
        let resPost =await this.postData(url,paramData);
        //对数字身份领取返回码1025进行特殊处理
        if(resPost.result.retCode==='0' || resPost.result.retCode==='1025' || (
          resPost.result.retCode==='-1' && url.indexOf('verifySecurityCode')> -1
        ) || resPost.result.retCode==='4068'){

          let verifyParam={
            data:resPost.result.data,
            sign:resPost.sign
          };
          let resVerify=await this.verifySign(initParam.verifySignUrl,verifyParam);
          if(resVerify.retCode=='0'){
            let result={
              retCode:resPost.result.retCode,
              data:JSON.parse(decryptMsg(resPost.result.data)),
              file:resPost.result.file,
              sign:resPost.sign
            }
            return result;

          }else{
            wx.showModal({
              showCancel:false,
              title: '提示',
              content: resVerify.retMsg,
              success (res) {
              }
            })
           
          }
        }else{
          let result={
            retCode:resPost.result.retCode,
            retMsg:resPost.result.retMsg
          }
          return result;
        }
     }else{
      wx.showModal({
        showCancel:false,
        title: '提示',
        content: resSign.retMsg,
        success (res) {
        }
      })
     }
    }catch(e){
      console.log(e)
      //网络异常，返回到前端通知
      let error={
        retCode:'-1',
        retMsg:"网络异常，请检查网络连接后再试"
      }
      return error;
    }
  }
  async image2Base64(url,data){
    let param={
      appId:initParam.appId,
      orgId:initParam.orgId,
      channel:3,
      msgId:getMsgId(),
      timestamp:getNowFormatDate(),
    }
    try{
      //第一步：数据签名
      let resSign= await this.signData(initParam.signUrl,param);
      if(resSign.retCode==='0'){
        let cryptStr="";
        let paramData={};
            //对数据进行加密
        cryptStr=encryptMsg(JSON.stringify(data));
        paramData={
          ...param,
          openId:initParam.openId,
          sign:resSign.sign,
          data:cryptStr,
          file:{
            userFaceImg:""
          }
        }
        return new Promise((resolve,reject)=>{
          wx.uploadFile({
            url,
            filePath: data.image,
            name: 'file',
            header:paramData,
            formData: paramData,
            success (res){
              let result = JSON.parse(res.data).result
              if (res.statusCode == 200) {
                result = {
                  retCode: result.retCode,
                  data: JSON.parse(decryptMsg(result.data)),
                  retMsg: result.retMsg
                }
                resolve(result)
              } else {
                resolve({
                  retCode: '-1',
                  retMsg: 'uploadFile:error'
                })
              }
              
            },
            fail(error) {
              reject(error)
            },
          })
        })
     }else{
      wx.showModal({
        showCancel:false,
        title: '提示',
        content: resSign.retMsg,
        success (res) {
        }
      })
     }
    }catch(e){
      console.log(e)
      //网络异常，返回到前端通知
      let error={
        retCode:'-1',
        retMsg:"网络异常，请检查网络连接后再试"
      }
      return error;
    }
  }
  //传输数据
  postData(url,data){
    return new Promise((resolve,reject)=>{
      wx.request({
        method:'post',
        url:url,
        data:data,
        header:{"content-type":"application/json"},
        success:(res)=>{
          resolve(res.data);
        },
        fail:(err)=>{
          reject(err);
        }
      })
    });
  }
  //数据签名
  signData(url,data){
    return  new Promise((resolve,reject)=>{
      wx.request({
        method:'post',
        url:url,
        data:data,
        header:{"content-type":"application/json"},
        success:(res)=>{
          resolve(res.data);
        },
        fail:(err)=>{
          reject(err);
        }
      });
    });
  }
  //检验签名
  verifySign(url,data){
    return  new Promise((resolve,reject)=>{
      wx.request({
        method:'post',
        url:url,
        data:data,
        header:{"content-type":"application/json"},
        success:(res)=>{
          resolve(res.data);
        },
        fail:(err)=>{
          reject(err);
        }
      });
    });
  }
  getParam(){
    return this.initParam;
  }
}
const base = new szsfServer(data.szsf);
export {
  base,
  data
};