// pages/service/algorithm/compare.js
const CusBase64 = require('../../utils/base64.js');
const faceData = require('./faceData')
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selected: '',
    curName:'',
    items: [
      {value: 'a', name: '眼神科技'},
      {value: 'b', name: '工银AI'},
      {value: 'c', name: '图灵人脸'}
    ],
    apiList:{
      'a':{
        'api':app.globalData.baseUrl + 'ai/abisFaceA',
        'appid':'3B9708339F2640B9AFC58D5149294741',
        'appSecret':'B99B32D1A2E9438C8D6E2A781CD5E97B',
        'name':'眼神科技人脸对比算法'
      },
      'b':{
        'api':app.globalData.baseUrl + 'ai/abisFaceB',
        'appid':'3B9708339F2640B9AFC58D5149294741',
        'appSecret':'B99B32D1A2E9438C8D6E2A781CD5E97B',
        'name':'工银AI'
      },
      'c':{
        'api':app.globalData.baseUrl + 'ai/pyFace',
        'appid':'3B9708339F2640B9AFC58D5149294741',
        'appSecret':'B99B32D1A2E9438C8D6E2A781CD5E97B',
        'name':'图灵人脸'
      }
    }
  },
  lifetimes: {
    attached() {
      let that=this;
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.record']) {
            wx.authorize({
              scope: 'scope.record',
              success () {
                that.ctx = wx.createCameraContext();
              }
            })
          }else{
            that.ctx = wx.createCameraContext();
          }
        }
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    compare() {
      let type = this.data.selected
      
      if(type===''){
        wx.showToast({
          title: '请选择算法',
          icon:'none'
        })
        return false
      }
      const that = this
      if (this.ctx && !this.ctx.takePhoto) {
        this.ctx = wx.createCameraContext();
      }
      this.ctx.takePhoto({
        success(res) {
          const tempImagePath = res.tempImagePath
          wx.compressImage({
            src: tempImagePath, // 图片路径
            quality: 50 ,// 压缩质量
            success(cf){
              let imgcf=cf.tempFilePath;
                let  FileSystemManager=wx.getFileSystemManager();
                FileSystemManager.readFile({
                  encoding:'base64',
                  filePath:imgcf,
                  success(f){
                    app.algorithm.img2 = f.data
                    that.doCompare()
                  }
                });
            },
            fail(e) {
              console.log(e, 888888)
            }
          })
        },
        fail() {

        }
      })
    },
    /**
     * 比对API
     */
    doCompare() {
      let _this = this
      let type = this.data.selected
      const code = CusBase64.CusBASE64.encoder(this.data.apiList[type].appid + ':' + this.data.apiList[type].appSecret)
      if (faceData[app.userInfo.pID]) {
        if (faceData[app.userInfo.pID].name !== app.userInfo.pName) {
          wx.showToast({
            title: '身份信息不匹配',
            icon:'none'
          })
          return
        }
      }
      let param = {
        data:{
          img1: faceData[app.userInfo.pID] ? faceData[app.userInfo.pID].img : '999',
          img2: app.algorithm.img2,
        }
      }
      wx.showLoading()
      wx.request({ 
        url: this.data.apiList[type].api, 
        method: 'post',
        data: param,
        header: {
          'content-type': 'application/json',
          'Authorization': 'Basic '+code
        },
        success (res) {
          wx.hideLoading()
          let {retCode,retMsg} = res.data.result
          console.log(res.data.result, 888)
          if(retCode === "0"){
            let info = res.data.result.data
            let title = ''
            let flag = false
            let msg = `通过 ${_this.data.apiList[type].name} 完成人脸比对`
            if(Number(info.score) > Number(info.threshold)){
              title = '人脸对比成功'
              flag = true
              wx.navigateTo({
                url: `/pages/algorithm/showSZSF/index`,
              })
            }else{
              title = '人脸对比不一致'
              flag = false
              app.res = {flag,title,msg}
              wx.redirectTo({
                url: `/pages/algorithm/result`,
              })
            }
            //_this.modalFn(title,msg)
            
          }else{
            
            // wx.showToast({
            //   title: retMsg,
            //   icon:'none'
            // })
            let title = '人脸对比不一致'
            let flag = false
            let msg = `通过 ${_this.data.apiList[type].name} 完成人脸比对`
            app.res = {flag,title,msg}
            wx.redirectTo({
              url: `/pages/algorithm/result`,
            })
          }
        }
      })
    },
    /**
     * 对比结果输出
     * @param {String} title 
     * @param {String} msg 
     */
    modalFn(title,msg){
      wx.showModal({
        title: title,
        content: msg,
        cancelText: '退出',
        confirmText: '继续比对',
        success (res) {
          if (res.confirm) {
            //console.log('用户点击确定')
          } else if (res.cancel) {
            //console.log('用户点击取消')
            wx.redirectTo({
              url: '/pages/algorithm/index'
            })
          }
        }
      })
    },
    /**
     * radio取值
     * @param {Object} e 
     */
    radioChange (e) {
      let arr = this.data.items
      for(let i in arr){
        if(arr[i].value === e.detail.value){
          wx.showToast({
            title: '当前算法：'+arr[i].name,
            icon:'none'
          })
          this.setData({
            selected: e.detail.value,
            curName:arr[i].name
          })
        }
      }
    }
  }
})
