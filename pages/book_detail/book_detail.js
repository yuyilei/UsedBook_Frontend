// pages/book_detail/book_detail.js

const app = getApp()
const requestHandler = require('../../common/requestHandler.js'); 

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
     var that = this
     var url = "/book/purchase/"
     var data = {
       book_id: book_id
     }
     var header = { token: app.globalData.token }
     requestHandler.syncRequest(url, data, header, "POST").then(res => {
       wx.showToast({
         title: '购买成功!',
       })
       wx.navigateBack({
         delta: 1,
       })
     }) 
   }, 

  /**
   * 下架图书
   */
  putoff(e){
    var book_id = e.currentTarget.dataset.id
    var that = this
    var url = "/book/putoff/"
    var data = {
      book_id: book_id
    }
    var header = { token: app.globalData.token }
    requestHandler.syncRequest(url, data, header, "PUT").then(res => {
      wx.showToast({
        title: '下架成功!',
      })
    }) 
  },

  /**
   * 上架图书
   */
  puton(e) {
    var book_id = e.currentTarget.dataset.id
    var onsell = e.currentTarget.dataset.on 
    var index = e.currentTarget.dataset.index
    var that = this
    var url = ""
    if (onsell == true) {
      url = "/book/putoff/"
    } else {
      url = "/book/puton/"
    }
    var data = {
      book_id: book_id
    }
    var header = { token: app.globalData.token }
    requestHandler.syncRequest(url, data, header, "PUT").then(res => {
      if (onsell == true) {
        wx.showToast({
          title: '下架成功!',
        })
        var newdata = this.data.second_data
        newdata[index].onsell = false
        that.setData({
          second_data: newdata
        })
      } else {
        wx.showToast({
          title: '上架成功!',
        })
        var newdata = this.data.second_data
        newdata[index].onsell = true
        that.setData({
          second_data: newdata
        })
      }
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

  }, 

  // 收藏
  collect: function(e) {
    let book_id = e.currentTarget.dataset.id 
    let index = e.currentTarget.dataset.index 
    let islike = e.currentTarget.dataset.islike 
    var that = this
    var url = ""
    if (islike == true) {
      url = "/book/uncollect/"
    } else {
      url = "/book/collect/"
    }
    var data = {
      book_id: book_id
    }
    var header = { token: app.globalData.token }
    requestHandler.syncRequest(url, data, header, "PUT").then(res => {
      if (islike == true) {
        wx.showToast({
          title: '取消收藏成功!',
        })
        var newdata = this.data.second_data
        newdata[index].islike = false 
        newdata[index].collect_count--
        that.setData({
          second_data: newdata
        })
      } else {
        wx.showToast({
          title: '收藏成功!',
        })
        var newdata = this.data.second_data
        newdata[index].islike = true
        newdata[index].collect_count++
        that.setData({
          second_data: newdata
        })
      }
    }) 
  }, 

})