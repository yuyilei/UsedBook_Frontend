//app.js

App({

  globalData: {
    userInfo: null,
    hostName: "http://127.0.0.1",
    port: ":5000",
    token: "",
    openid: "",
    userid: null,
    getUserInfoButton: false, // 是否显示获得用户信息的验证按钮 
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
          url: this.globalData.hostName + this.globalData.port + "/auth/login/",
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
              var first_login = _res.data['coin_task_success'] 
              if (first_login == true) {
                wx.showToast({
                  title: '每日登录 +5书币!',
                })
              }
            }
            if (this.userTokenReadyCallback) {
              _res.token = _res.data['token']
              this.userTokenReadyCallback(_res.data['token'])
            }
            // 此时一定已经获取了token，
            this.getUserInfo()
          },
          fail: _res => {
            wx.showToast({ title: '系统错误' }),
              console.log("res" + _res.data['message'])
          }
        })
      }
    })
  }, 

  /*
  * get user info and update username 
  */
  getUserInfo: function() {
    wx.getSetting({
      success: res => {
        console.log("userInfo ", res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          this.getUserInfoButton = false
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              var nickName = res.userInfo.nickName
              var avatar = res.userInfo.avatarUrl
              wx.request({
                url: this.globalData.hostName + this.globalData.port + "/auth/username/", 
                header: {token : this.globalData.token}, 
                data: {
                  username: nickName,
                  avatar: avatar, 
                  }, 
                method: 'POST', 
                success: res => {
                  if (res.statusCode == 200) {
                    console.log("update username success")
                  }
                }
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          // 没有获得授权，显示按钮，获得授权
          this.getUserInfoButton = true 
        }
      }
    })
  }, 
})