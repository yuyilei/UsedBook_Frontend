//app.js
App({

  globalData: {
    userInfo: null,
    hostName: "http://127.0.0.1",
    port: ":5000",
    token: "",
    openid: "",
    userid: null,
  },
 

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.openid = res.code
        wx.request({
          url: "http://127.0.0.1:5000/auth/login/",
          method: "POST",
          header: { 'content-type': 'application/json' },
          data: {
            code: res.code,
          },
          dataType: "json",
          success: _res => {
            if (_res.statusCode == 200) {
              this.globalData.token = _res.data['token']
              this.globalData.userid = _res.data['id']
            }
            if (this.userTokenReadyCallback) {
              _res.token = _res.data['token']
              this.userTokenReadyCallback(_res.data['token'])
            }
          },
          fail: _res => {
            wx.showToast({ title: '系统错误' }),
              console.log("res" + _res.data['message'])
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }, 

  get_openid: function (options) {
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          // console.log("result: ", res.code)
          return res.code; 
        } else {
          return "";
        }
      }
    }) 
  }, 

  userLogin: function () {
    // login with weixin's open_id
    var that = this;
    let promise = new Promise((resolve, reject) => {
      wx.login({
        success(res) {
          that.openid = res.code;
          // console.log("wx code: ", that.openid, " ")
          wx.request({
            url:  "http://127.0.0.1:5000/auth/login/",
            method: "POST",
            header: { 'content-type': 'application/json' },
            data: {
              code: that.openid,
            },
            dataType: "json",
            success: function (res) {
              if (res.statusCode == 200) {
                that.token = res.data['token']
                // console.log("token " + that.token)
                that.userid = res.data['id']
                resolve(res);
                // break
              }
            },
            fail: function (res) {
              reject(error)
              wx.showToast({ title: '系统错误' }),
                console.log("res" + res.data['message'])
            }
          })
        }
      })
    })
    return promise
  }
}
)