
const plugin = requirePlugin('szsf-wz-plugin');

Page({
  data: {
    data:{
      appId:'102404',//appid 102401
      accessToken:'',//用户accesToken，用于换取 图片 
      deviceId:'1010101010',//设备id
      deviceName:'xiaochengxuSDK',//设备名称  
      orgId:'88888888', //机构组织id  
      // szsfBid:'',
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
  onLoad(){

  },
  //回调方法
  resultFunc(res){
    console.log("SDK结果回调999");
    console.log(res.detail);
  }
})