// pages/travels/writetravels/writetravels.js
const wxRequest = require('../../../utils/promise-util.js');
const forMatTime = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    numList: [{
      name: '信息'
    }, {
      name: '行程'
    }, {
      name: '游记'
    }, {
      name: '发表'
    }, ],
    num: -1,
    ispublish:false,
    ispublish1:false,
    tripid: Number,
    travelid: String,
    CustomBar: app.globalData.CustomBar

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var travelId = options.tid
    console.log(travelId)
    if (travelId == 'a') {
      console.log('新建游记：travelid等于null')
      this.setData({
        travelid: travelId,
        num: 0
      })
    } else {
      console.log('编辑草稿:travelid不等于null')

      wxRequest.getRequest(app.globalData.get_trip_covermap_throw_travelid + travelId, null).then(res => {
        console.log(res)
        that.setData({
          tripid: res.id,
          travelid: travelId,
          num: 0
        })
      })
      // wxRequest.getRequest(app.globalData.get_travels_caogao + travelId, null).then(res => {
      //   console.log(res)
      // })


      // wxRequest.getRequest(app.globalData.get_travel_content + travelId, null).then(res => {
      //   //console.log(res)
      //   that.setData({
      //     travelcontent: res,
      //     num: 0
      //   })
      // })

    }



  },


  gotomes(e) {
    this.setData({
      num: e.detail.num,
      ispublish1: e.detail.ispublish,
    })
  },

  gototravels(e) {
    this.setData({
      num: e.detail.num,
      ispublish1: e.detail.ispublish,
    })
  },


  gototrip(e) {
    this.setData({
      num: e.detail.num
    })

  },
  gototravelend(e) {
    this.setData({
      num: e.detail.num
    })
  },



  gotopublish(e) {
    console.log(e.detail)
    this.setData({
      num: e.detail.num
    })
  },




  gotoxincheng(e) {
    console.log(e)
    this.setData({
      num: e.detail.num,
      ispublish: e.detail.ispublish,
      travelid: e.detail.travelid,
      tripid: e.detail.tripid
    })
  },

  backpage(e) {
    wx.showModal({
      title: '提示',
      content: '请确认编辑内容已保存，确定要退出编辑吗？',
      success(res) {
        if (res.confirm) {
          wx.navigateBack({
            delta: 1
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },











  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})