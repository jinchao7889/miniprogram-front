//app.js
const wxRequest = require('/utils/promise-util.js');
const host = 'http://127.0.0.1:8080';
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.login({
            success: res_login => {
              wx.getUserInfo({
                success: res => {
                  console.log(res);
                  // 登录
             
                  var data = {
                    "code": res_login.code,
                    "providerId": "weixin",
                    "vi": res.iv,
                    "encryptedData": res.encryptedData
                  }
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                  wxRequest.postLoginRequest(this.globalData.login_url, data, this.globalData.authorization).then(result=>{
                    console.log(result);
                  });
                }
              })
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    login_url: host + '/authentication/openid',
    authorization: 'Basic ZG9ua2V5OmRvbmtleS1zZWNyZXQ='
  }
})