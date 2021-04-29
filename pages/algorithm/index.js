
// pages/service/algorithm/index.js
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
    step: 1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectPhoto() {

      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          wx.compressImage({
            src: tempFilePaths[0], // 图片路径
            quality: 50 ,// 压缩质量
            success(cf){
              let imgcf=cf.tempFilePath;
                let  FileSystemManager=wx.getFileSystemManager();
                FileSystemManager.readFile({
                  encoding:'base64',
                  filePath:imgcf,
                  success(f){
                    app.algorithm.img1 = f.data
                    wx.redirectTo({
                      url: '/pages/algorithm/compare',
                    })
                  }
                });
            },
            fail(e) {
              console.log(e, 888888)
            }
          })
        }
      })
    }
  }
})
