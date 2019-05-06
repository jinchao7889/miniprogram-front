// pages/trip/home/home.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    scrollLeft: 0,
    tableData: ['综合', '天数', '最新', '人气'],
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'http://ldlj.shengjinglvyou01.top/bd/54/n/images/image004.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'http://ldlj.shengjinglvyou01.top/bd/54/n/images/image005.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'http://ldlj.shengjinglvyou01.top/bd/54/n/images/image012.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'http://ldlj.shengjinglvyou01.top/bd/54/n/images/image014.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'http://ldlj.shengjinglvyou01.top/bd/54/n/images/image021.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'http://ldlj.shengjinglvyou01.top/bd/54/n/images/image024.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'http://ldlj.shengjinglvyou01.top/bd/54/n/images/image020.jpg'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  }

})