// pages/service/algorithm/compare.js
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
    items: [
      {value: '1', name: '算法1'},
      {value: '2', name: '算法2', },
      {value: '3', name: '算法3'}
    ]
  },
  lifetimes: {
    attached() {
      console.log(app.algorithm.img2, 77666)
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
      const that = this
      this.ctx.takePhoto({
        success(res) {
          console.log(res, 9988776655444)
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
                    console.log(app.algorithm, 8888)
                  }
                });
            },
            fail(e) {
              console.log(e, 888888)
            }
          })
        },
        fail() {}
      })
      
      
    },
    doCompare() {
      const urlArr = [
        'http://ip:port/ai/abisFaceA',
        'http://ip:port/ai/abisFaceB',
        'http://ip:port/ai/pyFace'
      ]
      wx.request({ 
        url: 'test.php', //仅为示例，并非真实的接口地址
        data: {
          x: '',
          y: ''
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res.data)
        }
      })
      wx.showModal({
        title: '人脸对比成功',
        content: '通过商汤人脸对比V1完成人脸比对',
        cancelText: '退出',
        confirmText: '继续比对',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    radioChange (e) {
      this.setData({
        selected: e.detail.value
      })
    }
  }
})
