// pages/trip/home/home.js
const app = getApp();
const wxRequest = require('../../../utils/promise-util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    scrollLeft: 0,
    tableData: ['综合', '天数', '最新', '人气'],
    tripcontent:[],
    menuTop:Number,
    menuFixed:false,
    pages: 0,
    nowpages: 0,
    temp: 1,
    isLoad: false,






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

  

  onLoad: function (options) {
    this.loadtripcontent(0)

  },

  initClientRect:function () {
    var that = this;
    var query = wx.createSelectorQuery()
    query.select('#affix').boundingClientRect()
    query.exec(function (res) {
      that.setData({
        menuTop: res[0]
      })
    })
  },

  loadtripcontent(i){
    var data={
      "page": i,
      "size": 10
    }
    var that=this
    wxRequest.postRequest(app.globalData.get_trip_content, data).then(res => {
      console.log(res)
      var list = that.data.tripcontent
      that.setData({
        tripcontent: list.concat(res.dataList)
      })
      that.data.pages = res.pages
      that.data.nowpages = res.nowpages
    });

  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },


  onReachBottom: function () {
    if (this.data.nowpages < this.data.pages) {
      this.loadtripcontent(this.data.temp);
      this.data.temp = this.data.temp + 1;
    } else {
      // wx.showToast({
      //   title: '没有更多了！',
      //   icon: 'none'
      // })
      this.setData({
        isLoad: true
      })
      this.data.temp = 1;
    }
  },

})