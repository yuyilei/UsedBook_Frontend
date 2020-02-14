// pages/book_detail/book_detail.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    second_data: null,
  },

  /**
   * 获取详细信息
   */

  get_detail(book_id) {
    var that = this
    wx.request({
      url: app.globalData.hostName + app.globalData.port + "/book/detail/",
      header: { 'token': app.globalData.token },
      method: 'GET',
      data: {book_id: book_id},
      success: function (res) {
        if (res.statusCode === 200) {
          var result = []
          result.push(res.data['book'])
          that.setData({ second_data: result })
        }
      },
      fail: function (res) {
        console.log("错误！" + res.second_data['message'])
        wx.showToast({ title: '系统错误' })
      },
    })  
  },

  /**
   * 购买书籍 
   */
   
   topurchase(e) {
    var book_id = e.currentTarget.dataset.id 
     wx.request({
       url: app.globalData.hostName + app.globalData.port + "/book/purchase/",
       header: { 'token': app.globalData.token },
       method: 'POST',
       data: { book_id: book_id },
       success: function (res) {
         if (res.statusCode === 200) {
          wx.showToast({
            title: '购买成功!',
          })
           wx.navigateBack({
             delta: 1,
           })
         }
       },
       fail: function (res) {
         console.log("错误！" + res.second_data['message'])
         wx.showToast({ title: '系统错误' })
       },
     })  
   }, 

  /**
   * 下架图书
   */
  putoff(e){
    var book_id = e.currentTarget.dataset.id
    wx.request({
      url: app.globalData.hostName + app.globalData.port + "/book/putoff/",
      header: { 'token': app.globalData.token },
      method: 'PUT',
      data: { book_id: book_id },
      success: function (res) {
        if (res.statusCode === 200) {
          wx.showToast({
            title: '下架成功!',
          })
          wx.navigateBack({
            delta: 1,
          })
        }
      },
      fail: function (res) {
        console.log("错误！" + res.second_data['message'])
        wx.showToast({ title: '系统错误' })
      },
    })  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_detail(options.book_id)
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