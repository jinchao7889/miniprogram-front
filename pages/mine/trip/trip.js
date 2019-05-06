// pages/mine/trip/trip.js
const app = getApp();
var register = require('../../../mycompent/listload/refreshLoadRegister.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    scrollLeft: 0,
    tableData: ['收藏行程', '我的行程'],
    funny:[{
      'id':1,
      'littlepic':'http://ly123.qimingvip.cn/zhuanti454/upload/A02.jpg',
      'onclick':20
    }, {
        'id': 1,
        'littlepic': 'https://dimg01.c-ctrip.com/images/100c0x000000lgwip211D_R_1600_10000_Mtg_7.jpg',
        'onclick': 20
      },
      {
        'id': 1,
        'littlepic': 'http://ly123.qimingvip.cn/zhuanti454/upload/pzh03.jpg',
        'onclick': 20
      }, {
        'id': 1,
        'littlepic': 'http://ly123.qimingvip.cn/zhuanti454/upload/11.jpg',
        'onclick': 20
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    register.register(this);
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
    tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  }
  , refresh: function () {
    register.loadFinish(this, true);
 
  },
  //模拟加载更多数据
  loadMore: function () {
    register.loadFinish(this, true);
  }
})