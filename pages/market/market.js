const app = getApp() 
const requestHandler = require('../../common/requestHandler.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
     /* second_data: [
      {
        name: '计算机组成原理',
        price: '15', 
        id: 1,
        islike: false,
        image: '../../images/book/os.jpg',
        brief: '书很新，笔记很少，是正版',
        collect_count: 10,
      },
      {
        name: '现代操作系统',
        price: '20',
        id: 2,
        islike: true,
        image: '../../images/book/os.jpg',
        brief: '和习题解答一起出',
        collect_count: 5,
      }
      ], */
      second_data: null,
      token: null,
      keywordInput: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (app.globalData.token) {
      that.setData({
        token: app.globalData.token
      })
      this.getMarket()
    }
    else {
    // 给app.js 定义一个方法。
    app.userTokenReadyCallback = res => {
      console.log('获取用户信息成功');
      that.setData({
        token: res
      })
      this.getMarket()
      }
    }
  }, 

  /**
   * 获取首页数据 
   */

  getMarket() {
    var that = this
    wx.request({
      url: app.globalData.hostName + app.globalData.port + "/book/market/",
      header: { 'token': this.data.token},
      method: 'GET',
      success: function (res) {
        if (res.statusCode === 200) {
          that.setData({ second_data: res.data['books'] })
        }
      },
      fail: function (res) {
        console.log("错误！" + res.second_data['message'])
        wx.showToast({ title: '系统错误' })
      },
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
    this.getMarket() 
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

  searchBook: function (e) {
    var that = this
    var keyword = this.data.keywordInput
    var url = "/book/search/"
    var header = { token: app.globalData.token }
    var data = {
      keyword: keyword
    }
    requestHandler.syncRequest(url, data, header, "GET").then(res => {
      wx.showToast({
        title: '搜索成功！',
      })
      that.setData({
        second_data: res.data['book_list']
      })
    })
  },

  keywordInput: function(e) {
    var that = this 
    that.setData({
      keywordInput: e.detail.value 
    })
  },

  todetail: function (e) {
    wx.navigateTo({
      url: '/pages/book_detail/book_detail?book_id=' + e.currentTarget.dataset.id,
    })
  },
})