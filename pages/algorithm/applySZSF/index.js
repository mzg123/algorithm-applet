// pages/algorithm/applySZSF/index.js
const app = getApp()
const faceData = require('../faceData')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  next: function () {
    if (!faceData[app.userInfo.pID]) {
      wx.showToast({
        title: '请先注册身份信息',
        icon:'none'
      })
      return
    }
    wx.redirectTo({
      url: '/pages/algorithm/compare',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})