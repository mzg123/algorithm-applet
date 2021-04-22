

let CryptoJS = require("crypto.min.js");
import { urls, encryptKey } from './config'

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
//方法地址
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
export class szsfServer{
  constructor(param) {
    this.initParam=param;
    initParam=param;
  }
  async post(url,data,userFile=""){
    console.log("待加密数据", JSON.stringify(data), url);
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
        //对文件file进行处理
        if(userFile){
          let userFaceImg=data.userFaceImg;
          data.userFaceImg="";
           //对数据进行加密
          cryptStr=encryptMsg(JSON.stringify(data));
          paramData={
            ...param,
            sign:resSign.sign,
            data:cryptStr,
            file:{
              userFaceImg:userFaceImg
            }
          }
        }else{
            //对数据进行加密
            cryptStr=encryptMsg(JSON.stringify(data));
            paramData={
              ...param,
              sign:resSign.sign,
              data:cryptStr,
              file:{
                userFaceImg:""
              }
            }
        }
        let resPost =await this.postData(url,paramData);
        //对数字身份领取返回码1025进行特殊处理
        if(resPost.result.retCode==='0' || resPost.result.retCode==='1025'){
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
      // wx.showModal({
      //   showCancel:false,
      //   title: '提示',
      //   content: "网络异常，请检查网络连接后再试",
      //   success (res) {
         
      //   }
      // })
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
  uploadFile(url,data){
    return new Promise((resolve,reject)=>{
      wx.uploadFile({
        url: url, //仅为示例，非真实的接口地址
        filePath: data.imgPath,
        name: data.imgName,
        formData: data.formData,
        success (res){
          resolve(res.data); 
        },
        fail:(err)=>{
          reject(err);
        }
      })
    })
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
  //数字身份领取
  async getID(data){
    return await this.post(urls.getID,data,data.userFaceImg);
  }
  //数字身份签发
  async getSign(data){
    return await this.post(urls.getSign,data,data.userFaceImg);
  }
  //签发短信验证码
  async sendSignMsg(data){
    return await this.post(urls.sendSignMsg,data)
  }
  /**
   * 统一申请服务
   * 二维码赋码 2001
   * 签发 4001
   * 载体绑定 4002
   * 二级实名认证 5001
   * 数字身份冻结，解冻，注销，载体解绑，硬栽挂失、解挂、二技实人认证 5002
   */
  async sendApply(data){
    return await this.post(urls.sendApply,data);
  }
  //生成二维码
  async getQRcode(data){
    return await this.post(urls.getQRcode,data);
  }
  //查询户籍信息
  async getIDinfo(data){
     return await this.post(urls.getIDinfo,data);
  }
  /**
   * 代领相关方法
   */
  //代领-领取
  async getOtherID(data){
    return await this.post(urls.getOtherID,data,data.userFaceImg);
  }
  //代领-签发
  async getOtherSign(data){
    return await this.post(urls.getOtherSign,data,data.userFaceImg);
  }
  //获取代领列表
  async getOtherList(data){
    return await this.post(urls.getOtherList,data);
  }
  //获取代领二维码
  async getOtherQRcode(data){
    return await this.post(urls.getOtherQRcode,data);
  }
  //删除代领
  async delOtherID(data){
    return await this.post(urls.delOtherID,data);
  }
  //处理图片
  async imagetobase64(data){
    return await this.uploadFile(urls.imagetobase64,data);
  }
  //bid状态查询
  async checkStatus(data){
    return await this.post(urls.checkStatus,data);
  }
  //获取ctid相关信息
  async getCtidInfo(data){
    return await this.post(urls.getCtidInfo,data);
  }
}