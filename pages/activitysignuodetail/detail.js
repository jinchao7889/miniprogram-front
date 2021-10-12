// pages/activitysignuodetail/detail.js
const wxRequest = require('../../utils/promise-util.js');
const forMatTime = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    realName: String,
    qqNumber: String,
    wxNumber: String,
    contactId:String,
    contactNumber: String,
    gender:String,
    productId:Number
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var activityid = options.aid
    console.log('activityid:', activityid)
    var that=this
    wxRequest.getRequest(app.globalData.get_activity_signup_detail + activityid, null).then(res => {
      console.log('报名详情信息：', res)
      that.setData({
        realName: res.realName,
        qqNumber: res.qqNumber,
        wxNumber: res.wxNumber,
        contactId: res.contactId,
        contactNumber: res.contactNumber,
        gender: res.gender,
        productId: res.productId,
        activityId: res.activityId
      })
    })

  },
  activitydetail(){
    wx.navigateTo({
      url: '/pages/donkey-detail/detail?did='+this.data.activityId,
    })
  },

  goorderform(){
    console.log('点击了查看订单按钮')
    wx.navigateTo({
      url: '/pages/mine/ordermes/ordermes',
    })
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