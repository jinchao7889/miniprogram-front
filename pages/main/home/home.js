const wxRequest = require('../../../utils/promise-util.js');
var app = getApp();
var a = 1;
var pages = 0;
var nowPage = 0;

Page({
  options: {
    addGlobalClass: false,
  },
  data: {
    isLoad: false,
    cardCur: 0,
    hometravels: [],
    tableData: ['综合', '天数', '最新', '人气'],
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    menuTop: Number,
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
    }],
    ColorList: app.globalData.ColorList,
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  initClientRect: function() {
    var that = this;
    var query = wx.createSelectorQuery()
    query.select('#bffix').boundingClientRect()
    query.exec(function(res) {
      that.setData({
        menuTop: res[0]
      })
    })
  },


  onLoad() {
    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可

    this.loadTravelPages(0);

  },

  gotop: function(e) { // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试.'
      })
    }
  },



  loadTravelPages(i) {
    var data = {
      "page": i,
      "size": 8,
      "status": 2
    }

    var that = this

    wxRequest.postRequest(app.globalData.travel_div_pages, data).then(res => {
      console.log(res)
      var list = that.data.hometravels
      that.setData({
        hometravels: list.concat(res.dataList)
      })
      pages = res.pages
      nowPage = res.nowPage
    });
  },


  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },

  gototriphome() {
    wx.navigateTo({
      url: '/pages/trip/home/home'
    })
  },

  onReachBottom() {

    if (nowPage < pages) {
      this.loadTravelPages(a);
      a = a + 1;
    } else {
      this.setData({
        isLoad: true
      })
      a = 1;
    }

  },

  onPageScroll: function(e) {
    //console.log(e)
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },



  


})