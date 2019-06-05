// pages/caogao/caogao.js
const wxRequest = require('../../utils/promise-util.js');
const forMatTime = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    travelmes: [],
    pages: 0,
    nowpages: 0,
    temp: 1,
    isLoad: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadmoremes(0);
  },

  loadmoremes(i) {
    var that = this
    var data = {
      "page": i,
      "size": 5,
      "status": 1
    }

    wxRequest.postRequest(app.globalData.get_owner_travels, data).then(res => {
      console.log(res)
      var list = that.data.travelmes
      that.setData({
        travelmes: list.concat(res.dataList)
      })
      that.data.pages = res.pages
      that.data.nowpages = res.nowPage
    })
  },



  goeditcaogao(e) {

    var tid = this.data.travelmes[e.currentTarget.dataset.index].travelsId
    wx.navigateTo({
      url: `/pages/travels/writetravels/writetravels?tid=${tid}`,
    })
  },

  deletecaogao(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var travelid = this.data.travelmes[index].travelsId
    wx.showModal({
      title: '提醒',
      content: '确定删除这个草稿？',
      success(res) {
        if (res.confirm) {
          wxRequest.getRequest(app.globalData.delet_travel + travelid, null).then(res => {
            console.log('长按删除返回结果：', res)
            var data = {
              "page": 0,
              "size": 10,
              "status": 1
            }
            wxRequest.postRequest(app.globalData.get_owner_travels, data).then(res => {
              console.log(res.dataList)
              that.setData({
                travelmes: res.dataList
              })
              wx.showToast({
                title: '删除草稿成功！',
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


  onShow: function() {
    var that = this
    var data = {
      "page": 0,
      "size": 10,
      "status": 1
    }

    wxRequest.postRequest(app.globalData.get_owner_travels, data).then(res => {
      console.log(res.dataList)
      that.setData({
        travelmes: res.dataList
      })
    })
  },



  onReachBottom: function() {

    if (this.data.nowpages < this.data.pages) {
      this.loadmoremes(this.data.temp);
      this.data.temp = this.data.temp + 1;
    } else {
      this.setData({
        isLoad: true
      })
      this.data.temp = 1;
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})