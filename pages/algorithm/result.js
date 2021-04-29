// pages/algorithm/result.js
const app = getApp()
Component({

  /**
   * 页面的初始数据
   */
  data: {
    res:{}
  },

  lifetimes: {
    attached: function() {
      this.setData({
        res:app.res
      })
    }
  },

  methods:{
    cancel(){
      wx.redirectTo({
        url: '/pages/algorithm/index',
      })
    },
    ok(){
      wx.redirectTo({
        url: '/pages/algorithm/compare',
      })
    }
  }
})

