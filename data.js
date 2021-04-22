module.exports = {
  szsf: {
    szsfBidStatus:'',//数字身份状态码
    szsfStatus:'',//数字身份状态
    ctidOrgId:'',//ctid的orgId 00000001
    ctidAppId:'',//ctid的appId 1383
    openIdMain:'',//当前用户openid
    openIdRel:'',//他人身份openid
    ctid:'',//当前用户ctid
    reload:'0',
    // openId:'3302933f800341348f808ed8d4b03f2920210314184643',
   // openId:'92f90ad73a604d4d91ec26d99141be9720210311111500',
    //openId:'af78a751ceeb496da783273ac362844620210312160221',
    //openId:'f3d1c841a87645be84910345d6bc82c020210310085955',
    // openId:'9b8a73213f7e4210912871bc7dc2a28520210311154331',//openid 102102031203
    // openId:'',//'9b8a73213f7e4210912871bc7dc2a28520210311154331',//mzg
    openId: 'a295c640b25e4c3bbbb588c7b51c9e1c20210319091953', //夏爽
    // openId: '017b430f4ccd4348b35327712fbdfd8820210311183122',

    // openId:'017b430f4ccd4348b35327712fbdfd8820210311183122',//openid
    appId:'',//'102401',//appid 
    orgId:'',//'88888888',   
   // appId:'1383',//appid 
    //orgId:'00000001',   
    channel:3, //渠道 3小程序
    // appId:'0003',//appid 防控小程序
    // orgId:'00001381',  
    deviceId:'',//'10001',//设备id
    deviceName:'',//'xiaochengx',//设备名称  
    szsfBid:'',// mzg
    accessToken:'',//用户accesToken 8 
    signUrl:'https://xasiTest.dccnet.com.cn:8080/dev/digitalIdentity/sign',//签名地址
    verifySignUrl:'https://xasiTest.dccnet.com.cn:8080/dev/digitalIdentity/verify',//验签地址
    // signUrl:'http://219.143.240.4/dev/digitalIdentity/sign',//签名地址
    // verifySignUrl:'http://219.143.240.4/dev/digitalIdentity/verify',//验签地址
    // signUrl:'https://api.nbpark.online/dev/digitalIdentity/sign',//签名地址-ngix
    // verifySignUrl:'https://api.nbpark.online/dev/digitalIdentity/verify',//验签地址-nginx
    //signUrl:'https://check.cn.utools.club/sign',//签名地址-防控小程序
    //verifySignUrl:'https://check.cn.utools.club/verifySign',//验签地址-防控小程序
    userName:"",//用户姓名
    userID:"",//证件号码
    userIDtype:1,//证件类型
    userPhone:""//手机号码
  },
  menu: {},
  bankItem: {}
}