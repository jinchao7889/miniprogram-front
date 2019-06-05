// pages/writetrips/qianyan/qinyan.js
const wxRequest = require('../../../utils/promise-util.js');
const forMatTime = require('../../../utils/util.js');
var app = getApp();
var flag = false;
Page({

  /**
   * 页面的初始数据
   */
  tid: -1,
  data: {
    content: String
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.tid = options.tid
    console.log(this.tid)
    var that = this
    wx.getStorage({
      key: String(that.tid + 'trip'),

      fail: function(res) {
        wxRequest.getRequest(app.globalData.get_trip_qianyan + that.tid, null).then(res => {
          console.log(res)
          that.setData({
            content:res.content
          })
          wx.setStorage({
            key: String(that.tid + 'trip'),
            data: res,
          })
        })
      },

      success: function(res) {
        that.setData({
          content: res.data.content
        })
      },
    })
  },


  gettextcontent(e) {
    this.data.content = e.detail.value
    flag = true
  },

  backpage(e) {
    var that = this
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: '您有更改的内容，是否保存？',
        success(res) {
          if (res.confirm) {
            var data = {
              "id": that.tid,
              "content": that.data.content
            }
            wxRequest.postRequest(app.globalData.add_trip_qianyan, data).then(res => {
              console.log(res)

              wx.setStorage({
                key: String(that.tid + 'trip'),
                data: res,
              })

              wx.showToast({
                title: '保存成功！'
              })
              flag = false
              wx.navigateBack({
                delta: 1
              })

            })

          } else if (res.cancel) {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
  },



  savecontent(e) {
    var that = this
    if (flag == false) {
      wx.showToast({
        title: '内容未做更改',
        icon: 'none'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '您有更改的内容，是否保存？',
        success(res) {
          if (res.confirm) {
            var data = {
              "id": that.tid,
              "content": that.data.content
            }
            wxRequest.postRequest(app.globalData.add_trip_qianyan, data).then(res => {
              console.log(res)

              wx.setStorage({
                key: String(that.tid + 'trip'),
                data: res,
              })
              flag = false
              wx.showToast({
                title: '保存成功！'
              })

            })

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    }
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
    var data = {
      "id": that.tid,
      "content": that.data.content
    }
    wxRequest.postRequest(app.globalData.add_trip_qianyan, data).then(res => {})
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