// pages/mycoin/mycoin.js
const app = getApp()
const requestHandler = require('../../common/requestHandler.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myCoinCount: 0,
    taskCount: { 
      login: 0, 
      collect: 0, 
      publish: 0, 
      comment: 0, 
     }, 
     maxTaskCount: {
      login: 1, 
      collect: 5, 
      publish: 5, 
      comment: 5, 
     }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '做任务得书币！',
      duration: 2000,
    })
    var that = this
    var url = "/user/coin/"
    var data = {
    }
    var header = { token: app.globalData.token }
    requestHandler.syncRequest(url, data, header, "GET").then(res => {
      var data = res.data 
      that.setData({
        myCoinCount: data['coin_count'], 
        taskCount: data['tasks']
      })
    }) 
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