const wxRequest = require('../../../utils/promise-util.js');
const forMatTime = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isfold: false
  },

  
  onLoad: function (options) {
    var orderformid=options.oid
    wxRequest.getRequest(app.globalData.get_order_detail + orderformid, null).then(res => {
      console.log('订单详情：', res)
    })
  },



  goisfold() {
    this.setData({
      isfold: !this.data.isfold
    })
  },



  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  }
})