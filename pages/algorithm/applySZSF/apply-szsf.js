const app = getApp()
Component({
   //组件静态配置
   properties: {
    sdkData:{
      type:Object,
      value:{}
    },
  },
  observers: {
    'sdkData.**': function(sdkData) {
      this.setData({
        initData:sdkData
      })
     
      this.setData({
        personName:this.data.initData.personName,
        personID:this.data.initData.personID
      });
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    array: ['居民身份证'],
    index: 0,
    personName:'',
    personID:'',
    IdObject:1,
    initData:{}
  },
  ready(){
  
  },
  /**
   * 组件的方法列表
   */
  methods: {
    sendInfo(){
      var pName=this.data.personName;
      pName=pName.replace(/\s+/g,"");
      if(!pName || pName.length<2){
        //wx.showToast({
        //   title: "请输入姓名",
        //   icon: 'error',
        //   duration: 1000
        // })
        wx.showModal({
          showCancel:false,
          title: '异常提示',
          content: "请输入姓名",
          success (res2) {}
        })
        return false;
      }
      var pID=this.data.personID;
      pID=pID.replace(/\s+/g,"");
      //身份证格式校验
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if(reg.test(pID) === false){
        // wx.showToast({
        //   title: "身份证号码错误",
        //   icon: 'error',
        //   duration: 1000
        // })
        wx.showModal({
          showCancel:false,
          title: '异常提示',
          content: "请输入正确的身份证",
          success (res2) {}
        })
        return false;
      }
      app.userInfo = {
        pName: this.data.personName,
        pID: this.data.personID
      }
      this.triggerEvent('CallBack', {
        personID:this.data.personID,
        personName:this.data.personName
      })
    }
  }
})
