const app = getApp() 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
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
    
  },

/*
  用户查看发布的二手书
*/
  published: function (e) {
    wx.navigateTo({
      url: '/pages/published/published',
    })
  },

/*
用户查看自己收藏的书
*/
  interested: function (e) {
    wx.navigateTo({
      url: '/pages/interested/interested',
    })
  },

  /*
  用户查看自己买到的书
  */
  bought: function (e) {
    wx.navigateTo({
      url: '/pages/bought/bought',
    })
  },

  /*
用户查看自己的书币
*/
  mycoin: function (e) {
    wx.navigateTo({
      url: '/pages/mycoin/mycoin',
    })
  },

})