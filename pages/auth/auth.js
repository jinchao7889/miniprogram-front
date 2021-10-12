// pages/auth/auth.js
const app = getApp();
const wxRequest = require('../../utils/promise-util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
  },
  onLoad: function(e) {
    console.log('判断是否授权')
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          //wx.showLoading({
            //title: '自动登陆中',
         // })
            this.myLogin()
      }
      }
    })
  }
  ,
  onGetUserInfo: function (e) {
 
    if (!this.logged && e.detail.userInfo) {
      wx.showLoading({
        title: '登录中',
      })
     this.myLogin()
    }else{

    }
  },
  myLogin: function(){
    wx.login({
      success: res_login => {
        wx.getUserInfo({
          success: res => {
            // 登录
            var data = {
              "code": res_login.code,
              "providerId": "weixin",
              "vi": res.iv,
              "encryptedData": res.encryptedData
            }
            // 发送 res.code 到后台换取 openId, sessionKey, unionId

            wxRequest.postLoginRequest(app.globalData.login_url, data, app.globalData.authorization).then(result => {
              app.globalData.userInfo = result.user_info;

              console.log(result)


              try {
                wx.setStorageSync('user_info', result.user_info)
                wx.setStorageSync('access_token', result.access_token)
                wx.setStorageSync('access_token_expires_in', result.expires_in + (new Date()).getTime()/1000)
                //result.expires_in+(new Date()).getTime/1000
                wx.switchTab({
                  url: "/pages/main/home/home",
                })
              } catch (e) {
                console.log('获取用户token失败！')
                wx.showToast({
                  title: '获取用户token失败，请退出重试！',
                })
              }

              //console.log(result.access_token)
            });
          }
        })
      }
    })
  }
})