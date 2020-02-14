
const app = getApp()
const server = app.globalData.hostName + app.globalData.port
console.log(server);
//默认请求
function syncGetRequest(url, params, header) {
  let promisevariable = new Promise(function (resolve, reject) {
    wx.request({
      url: server + url,
      data: params,
      method: 'GET',
      header: header,
      success: function (result) {
        var status = result.statusCode;
        if (status == 500) {
          //程序抛出异常
          var exception = result.data.exception;
          var msg = result.data.message;

          wx.showToast({
            title: exception + "\r\n" + msg,
            icon: 'loading',
            duration: 1000
          });
          resolve(null);
          return;
        }
        if (status != 200) {
          //系统未知异常
          var msg = result.data.message;
          wx.showToast({
            title: msg + "\n\r",
            icon: 'loading',
            duration: 1000
          });
          resolve(null);
          return;
        }
        resolve(result);
      }
    });
  });
  return promisevariable;
}

module.exports = {
  syncGetRequest: syncGetRequest,//公布公共请求接口
}
