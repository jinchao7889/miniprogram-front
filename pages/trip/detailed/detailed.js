// pages/trip/detailed/detailed.js
const wxRequest = require('../../../utils/promise-util.js');
const forMatTime = require('../../../utils/util.js');
var app = getApp();
var tId = '';
var tripID=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    content: [],
    iscollection:Boolean,
    tripid:Number
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    tId = options.tid
    console.log(tId)
    var that = this
    wxRequest.getRequest(app.globalData.trip_mainpage_detail + tId, null).then(res => {
      console.log(res)
      tripID = res.tripId
      that.setData({
        content: res,
        iscollection: res.isCollection,
        tripid: res.tripId
      })
    })
  },

  gochecktravels() {
    console.log('点击我前往查看行程对应的游记')
    wx.redirectTo({
      url: `/pages/travels/details/details?tid=${tId}`
    })
  },

  tripcollection() {
    var that=this
    if (this.data.iscollection==false){
      wxRequest.getRequest(app.globalData.add_trip_collection + tripID, null).then(res => {
        console.log(res)
        that.setData({
          iscollection:true
        })
      })
    }else{
      wxRequest.getRequest(app.globalData.cancel_trip_collection + tripID, null).then(res => {
        console.log(res)
        that.setData({
          iscollection: false
        })
      })
    }
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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