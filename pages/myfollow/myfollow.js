// pages/myfollow/myfollow.js
const wxRequest = require('../../utils/promise-util.js');
const forMatTime = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: [],
    num: 0,
    pages: 0,
    nowpages: 0,
    temp: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loaduserinfo(0)
  },

  loaduserinfo(i) {
    var that = this
    var data = {
      "page": i,
      "size": 20
    }
    wxRequest.postRequest(app.globalData.get_owner_follow_user, data).then(res => {
      var list = that.data.userinfo
      that.setData({
        userinfo: list.concat(res.dataList),
        num: that.data.num+res.dataList.length
      })
      that.data.pages = res.pages
      that.data.nowpages = res.nowPage
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  cancelfollow(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var befollowuserid = this.data.userinfo[index].beConcernedUserId
    var nickname = this.data.userinfo[index].nickname

    wx.showModal({
      title: '提醒',
      content: String('确定取消对 '+nickname+' 的关注吗?'),
      success(res) {
        if (res.confirm) {
          wxRequest.getRequest(app.globalData.isFollowcancel + befollowuserid, null).then(res => {
            console.log('取消关注：', res)
            that.loaduserinfo(0)
          })
         } else if (res.cancel) {
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
  onReachBottom: function () {

    if (this.data.nowpages < this.data.pages) {
      this.loaduserinfo(this.data.temp);
      this.data.temp = this.data.temp + 1;
    } else {
      wx.showToast({
        title: '没有更多了！',
        icon: 'none'
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