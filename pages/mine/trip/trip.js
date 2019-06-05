var register = require('../../../mycompent/listload/refreshLoadRegister.js');
const wxRequest = require('../../../utils/promise-util.js');
const forMatTime = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    scrollLeft: 0,
    tableData: ['收藏行程', '我的行程'],
    collectiontrip: [],
    minetrip: [],
    pages: 0,
    nowpages: 0,
    temp: 1,
    pagesa: 0,
    nowpagesa: 0,
    tempa: 1,
  },


  onLoad: function(options) {
    // var that = this
    // var data = {
    //   "page": 0,
    //   "size": 20
    // }
    // wxRequest.postRequest(app.globalData.get_owner_follow_trips, data).then(res => {
    //   console.log('获得的收藏行程内容：', res)
    //   that.setData({
    //     collectiontrip: res.dataList
    //   })
    // })

    // var dataa = {
    //   "page": 0,
    //   "size": 20,
    //   "status": 2
    // }
    // wxRequest.postRequest(app.globalData.get_owner_trips, dataa).then(res => {
    //   console.log('获得的我的行程内容：', res)
    //   that.setData({
    //     minetrip: res.dataList
    //   })
    // })
    this.loadmoremes(0);
    this.loadmoreminetrip(0);

  },

  loadmoremes(i) {
    var that = this
    var data = {
      "page": i,
      "size": 5
    }

    wxRequest.postRequest(app.globalData.get_owner_follow_trips, data).then(res => {
console.log(res)
      var list = that.data.collectiontrip
      that.setData({
        collectiontrip: list.concat(res.dataList)
      })
      that.data.pages = res.pages
      that.data.nowpages = res.nowPage
    })
  },

  loadmoreminetrip(i) {
    var that = this
    var data = {
      "page": i,
      "size": 5,
      "status": 2
    }

    wxRequest.postRequest(app.globalData.get_owner_trips, data).then(res => {
console.log(res)
      var list = that.data.minetrip
      that.setData({
        minetrip: list.concat(res.dataList)
      })
      that.data.pagesa = res.pages
      that.data.nowpagesa = res.nowPage
    })
  },




  godelet(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var tripid = this.data.collectiontrip[index].tripId
    wx.showModal({
      title: '提醒',
      content: '确定取消收藏这个行程吗？',
      success(res) {
        if (res.confirm) {
          wxRequest.getRequest(app.globalData.cancel_trip_collection + tripid, null).then(res => {
            console.log('取消收藏行程返回结果：', res)

            var data = {
              "page": 0,
              "size": 20
            }
            wxRequest.postRequest(app.globalData.get_owner_follow_trips, data).then(res => {
              that.setData({
                collectiontrip: res.dataList
              })
              wx.showToast({
                title: '取消收藏行程成功！',
                icon: 'none'
              })
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })


  },


  gotripdetail(e) {
    var index = e.currentTarget.dataset.index
    var travelid = this.data.collectiontrip[index].travelsId
    wx.navigateTo({
      url: `/pages/trip/detailed/detailed?tid=${travelid}`,
    })

  },

  gominetripdetail(e){
    var index = e.currentTarget.dataset.index
    var travelid = this.data.minetrip[index].travelsId
    wx.navigateTo({
      url: `/pages/trip/detailed/detailed?tid=${travelid}`,
    })

  },

  gowritenewcontent(e) {
    wx.navigateTo({
      url: `/pages/travels/writetravels/writetravels?tid=a`,
    })
  },


  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },


  onReachBottom: function() {
    if (this.data.TabCur == 0) {
      if (this.data.nowpages < this.data.pages) {
        this.loadmoremes(this.data.temp);
        this.data.temp = this.data.temp + 1;
      } else {
        wx.showToast({
          title: '没有更多了！',
          icon: 'none'
        })
        this.data.temp = 1;
      }
    } else {
      if (this.data.nowpagesa < this.data.pagesa) {
        this.loadmoreminetrip(this.data.tempa);
        this.data.tempa = this.data.tempa + 1;
      } else {
        wx.showToast({
          title: '没有更多了！',
          icon: 'none'
        })
        this.data.tempa = 1;
      }
    }

  },






})