//app.js
const wxRequest = require('/utils/promise-util.js');
const host = 'http://192.168.1.3:8080';
App({
  onLaunch: function () {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
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
                    this.globalData.userInfo = result.user_info;
                    console.log(this.globalData.userInfo );
                  });
                }
              })
            }
          })
        }else{
          wx.redirectTo({
            url: '/pages/auth/auth'
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    login_url: host + '/authentication/openid',
    authorization: 'Basic ZG9ua2V5OmRvbmtleS1zZWNyZXQ=',
    ColorList: [{
      title: '嫣红',
      name: 'red',
      color: '#e54d42'
    },
    {
      title: '桔橙',
      name: 'orange',
      color: '#f37b1d'
    },
    {
      title: '明黄',
      name: 'yellow',
      color: '#fbbd08'
    },
    {
      title: '橄榄',
      name: 'olive',
      color: '#8dc63f'
    },
    {
      title: '森绿',
      name: 'green',
      color: '#39b54a'
    },
    {
      title: '天青',
      name: 'cyan',
      color: '#1cbbb4'
    },
    {
      title: '海蓝',
      name: 'blue',
      color: '#0081ff'
    },
    {
      title: '姹紫',
      name: 'purple',
      color: '#6739b6'
    },
    {
      title: '木槿',
      name: 'mauve',
      color: '#9c26b0'
    },
    {
      title: '桃粉',
      name: 'pink',
      color: '#e03997'
    },
    {
      title: '棕褐',
      name: 'brown',
      color: '#a5673f'
    },
    {
      title: '玄灰',
      name: 'grey',
      color: '#8799a3'
    },
    {
      title: '草灰',
      name: 'gray',
      color: '#aaaaaa'
    },
    {
      title: '墨黑',
      name: 'black',
      color: '#333333'
    },
    {
      title: '雅白',
      name: 'white',
      color: '#ffffff'
    },
    ]
  }
})