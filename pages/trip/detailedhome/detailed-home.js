// pages/trip/detailedhome/detailed-home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PageCur: 'qianyan',
    index:0,
    title: ["前言", "行程", "花销", "清单", "解惑"]
  },

 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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

  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur,
      index: e.currentTarget.dataset.index
    })
  }
})