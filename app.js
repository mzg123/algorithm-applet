const sdkData = require('./data')

App({
  algorithm: {},
  res:{},
  globalData:{
    baseUrl:'https://didev.dccnet.com.cn:8080/',
    userName:'',
    userID:"",
    userPhone:'',
    deviceId:'',
    deviceName:'',
    openId:''
  },
  onShow: function (options) {
    if (options.referrerInfo && options.referrerInfo.extraData && options.referrerInfo.extraData.data) {
      this.data = options.referrerInfo.extraData.data
      sdkData.szsf.userName=this.data.userName;
      sdkData.szsf.userID=this.data.userID;
      sdkData.szsf.userPhone=this.data.userPhone;
      sdkData.szsf.deviceId=this.data.deviceId;
      sdkData.szsf.deviceName=this.data.deviceName;
      sdkData.szsf.openId=this.data.openId;
      sdkData.szsf.appId = "102401";
      sdkData.szsf.orgId = "88888888";
      //sdkData.szsf.appId = "1383"
      //sdkData.szsf.orgId = "00000001"
    }
  },
  onLaunch: function (options) {
  }
})
