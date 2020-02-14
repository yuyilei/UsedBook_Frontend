// pages/published/published.js

const app = getApp()
const requestHandler = require('../../common/requestHandler.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
      second_data: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var url = "/user/publish/"
    var data = {

    }
    var header = { token: app.globalData.token }
    requestHandler.syncRequest(url, data, header, "GET").then(res => {
      that.setData({
        second_data: res.data["book_list"]
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

  },

  todetail: function (e) {
    wx.navigateTo({
      url: '/pages/book_detail/book_detail?book_id=' + e.currentTarget.dataset.bookid,
    })
  },
})