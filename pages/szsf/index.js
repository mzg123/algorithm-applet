/**
 * @title 数字身份微信小程序SDK
 * 
 */
let szsfPlugin = {} //requirePlugin('szsf-plugin')
const plugin = {} //requirePlugin('szsf-wz-plugin');
Page({
  data: {
    items: [],
    currentItem: 0,
    initData:{
      appId:'102404',//appid 102401
      accessToken:'',//用户accesToken，用于换取图片 
      deviceId:'1010101010',//设备id
      deviceName:'xiaochengxuSDK',//设备名称  
      orgId:'88888888', //机构组织id  
      szsfBid:'',
      openId: '',
      wzPlugin: plugin,
      //szsfBid:'7861AC1028CB120B0000002200017743AECA8800000001000000010000000001', //数字身份Bid
      signUrl:'https://xasitest.dccnet.com.cn:8080/dev/digitalIdentity/sign',//签名地址
      verifySignUrl:'https://xasitest.dccnet.com.cn:8080/dev/digitalIdentity/verify',//验签地址
      // userName:'',//'吕冀川',//用户姓名
      // userID:'',//'130982198706131416',//证件号码
      // userIDtype:1,//证件类型，身份证默认1
      // userPhone:'',//'13522919717'//手机号码
    }
  },
  onLoad() {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success () {
            }
          })
        }
      }
    })
    // szsfPlugin = requirePlugin('szsf-plugin')
    // plugin.sayHello()
    // const world = plugin.answer
    // plugin.setAnswer(function(){
    //   console.log("触发回调")
    // });
  },
  //跳转到数字身份页面
  goToSZSF() {
    // szsfPlugin.initData=this.data.initData;
    szsfPlugin.setData(this.data.initData)
    wx.navigateTo({
      url: 'plugin://szsf-plugin/szsf-page',
    })
  },
  goToCode() {
    const data = {
      appId:'102404',//appid 102401
      accessToken:'',//用户accesToken，用于换取图片 
      deviceId:'1010101010',//设备id
      deviceName:'xiaochengxuSDK',//设备名称  
      orgId:'88888888', //机构组织id  
      szsfBid:'',
      openId: '14fdd728b64344c9a31f18462093d14e20210427110038',
      wzPlugin: plugin,
      //szsfBid:'7861AC1028CB120B0000002200017743AECA8800000001000000010000000001', //数字身份Bid
      signUrl:'https://xasitest.dccnet.com.cn:8080/dev/digitalIdentity/sign',//签名地址
      verifySignUrl:'https://xasitest.dccnet.com.cn:8080/dev/digitalIdentity/verify',//验签地址
      userName:'苗志高',//'吕冀川',//用户姓名
      userID:'131081198602091216',//'130982198706131416',//证件号码
      userIDtype:1,//证件类型，身份证默认1
      // userPhone:'',//'13522919717'//手机号码
    }
    szsfPlugin.setData(data)
    wx.navigateTo({
      url: 'plugin://szsf-plugin/szsf-page',
    })
  },
  goToTest() {
    wx.navigateTo({
      url: '/pages/szsf/test',
    })
  },
  addItem() {
    this.data.items.push(this.data.currentItem++)
    this.setData({
      items: this.data.items,
      currentItem: this.data.currentItem
    })
  }
})
