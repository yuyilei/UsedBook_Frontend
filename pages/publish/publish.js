const app = getApp() 
const qiniuUploader = require("../../utils/qiniuUploader")
const requestHandler = require('../../common/requestHandler.js'); 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageURL: "../../images/tabbar/image_upload.png",
    qiniuToken : null,
    qiniuBucket : null,
    bookName: null, 
    tags: null,
    information: null,
    contact: null, 
    price: null,
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

  chooseImage: function(e) {
    var that = this
    this.getQiniuToken()
  },

  uploadImage: function(qiniuToken, bucket) {
    var that = this
    wx.chooseImage({
      count: 1,
      success: function(res) {
        var filePath = res.tempFilePaths[0]
        qiniuUploader.upload(filePath, (res)=> {
          that.setData({
            imageURL: "http://" + res.imageURL,
          });
      }, (error) => {
        console.log('error: ' + error)
      }, {
            region: 'ECN',
            domain: bucket, 
            uptoken: qiniuToken, 
          }, (res) => {
            
          }, () => {
            // 取消上传
          }, () => {
            // `before` 上传前执行的操作
          }, (err) => {
            // `complete` 上传接受后执行的操作(无论成功还是失败都执行)
        });
      }  
    })
  },
  
  getQiniuToken: function() {
    var that = this
    var url = "/auth/qiniu/" 
    var params = {} 
    var header = {token: app.globalData.token}
    requestHandler.syncRequest(url, params, header, "GET").then(res => {
      this.uploadImage(res.data['token'], res.data['bucketname'])
    })
  },

   previewUpload: function(e) {
     var that = this
     var src = that.data.imageURL
     var imageList = [that.data.imageURL]
     wx.previewImage({
       current: src, 
       urls: imageList,
     })
   }, 

    nameinput: function(e) {
      var that = this
      let name = e.detail.value
      if (name == null || name == "") {
        wx.showToast({
          title: "书名不能为空！",
          icon: "none",
        })
      } else {
        that.setData({
          bookName: name,
        })
      }
      return false
    }, 

    labelinput: function(e) {
      var that = this
      let labels = e.detail.value
      if (labels != null && labels != "") {
        that.setData({
          tags: labels.trim().split(/\s+/)
        })
      }
    }, 

    detailinput: function(e) {
      var that = this 
      let detail = e.detail.value 
      if (detail == null || detail == "") {
        wx.showToast({
          title: "书本详情不能为空！",
          icon: "none", 
        })
      } else {
        that.setData({
          information: detail, 
        })
      }
    }, 

    contactinput: function(e) {
      var that = this 
      let _contact = e.detail.value 
      if (_contact == null || _contact == "") {
        wx.showToast({
          title: "联系方式不能为空！",
          icon: "none",
        })
      } else {
        that.setData({
          contact: _contact, 
        })
      }
    }, 

    pressInput: function(e) {
      var that = this 
      let _price = e.detail.value 
      if (_price == null || _price == "") {
        wx.showToast({
          title: "价格不能为空", 
          icon: "none",
        })
      } else if (!(/(^[1-9]\d*$)/.test(_price))){
          wx.showToast({
            title: "价格必须为正整数！", 
            icon: "none", 
          })
      } else {
        that.setData({
          price: _price, 
        })
      }
    },

    getsubmit: function(e) {
      let values = e.detail.value 
      if (this.data.imageURL == null || this.data.imageURL == "") {
        wx.showToast({
          title: '图片不能为空!',
          icon: 'none', 
        })
      }
      if (values.sell_title == null || values.sell_title == "") {
        wx.showToast({
          title: '书名不能为空!',
          icon: 'none', 
        })
      }
      if (values.sell_detail == null || values.sell_detail == "") {
        wx.showToast({
          title: '书本详情不能为空!',
          icon: 'none', 
        })
      }
      if (values.sell_connect == null || values.sell_connect == "") {
        wx.showToast({
          title: '联系方式不能为空',
          icon: 'none', 
        })
      }
      if (values.sell_press == null || values.sell_press == "") {
        wx.showToast({
          title: '价格不能为空!',
          icon: 'none', 
        })
      }
    }, 

    publishBook: function(e) {
      var that = this
      var url = "/book/publish/"
      var data = {
        picture: this.data.imageURL, 
        price: this.data.price, 
        name: this.data.bookName, 
        title: this.data.bookName, 
        contact: this.data.contact, 
        information: this.data.information, 
        tags: this.data.tags, 
      }
      var header = { token: app.globalData.token }
      requestHandler.syncRequest(url, data, header, "POST").then(res => {
        var message = "发布成功" 
        if (res.data["coin_task_success"] == true) {
          message += "书币+2"
        } else {
          message += "!"
        }
        wx.showToast({
          title: message, 
        })
        console.log("message ", message)
        wx.navigateTo({
          url: '/pages/book_detail/book_detail?book_id=' + res.data['book_id'],
        })
      }) 
    },  
  });