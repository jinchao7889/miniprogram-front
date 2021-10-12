const wxRequest = require('../../utils/promise-util.js');
const forMatTime = require('../../utils/util.js');
var app = getApp();
Page({

  data: {
    travelid: String,
    html: null,
    title: String,
    imageUploadUrl: "",
    imageUploadHeader: "",
    imageUploadName: "",
    flag:false
  },

  onLoad: function(options) {
    var title = options.title
    this.data.travelid = options.tid
    this.setData({
      title: title
    })
    var that = this
    wx.getStorage({
      key: String('content' + options.tid),
      success(res) {
        that.setData({
          html: res.data.content,
          flag:true
        })

      }
    })

    console.log(this.data.title, this.data.travelid)

    var imageUploadUrl = app.globalData.file_upload_url;
    const value = wx.getStorageSync('access_token')
    // Do something with return value
    var header = {
      "Content-Type": "application/json",
      "Authorization": "bearer" + value
    }
    var imageUploadName = "file";
    this.setData({
      imageUploadUrl: imageUploadUrl,
      imageUploadHeader: header,
      imageUploadName: imageUploadName
    })
  },

  finish(e) {
    var that = this
    var content = e.detail.content
    var data = {
      "travelsId": this.data.travelid,
      "content": content
    }
    wxRequest.postRequest(app.globalData.updata_travel_content, data).then(res => {
      console.log('游记内容存储返回值：', res)
      wx.setStorage({
        key: String('content' + that.data.travelid),
        data: res
      })

      wx.showToast({
        title: '保存成功!',
        icon: 'none'
      })
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
    var that = this
    var content = e.detail.content
    var data = {
      "travelsId": this.data.travelid,
      "content": content
    }
    wxRequest.postRequest(app.globalData.updata_travel_content, data).then(res => {
      console.log('游记内容存储返回值：', res)
      wx.setStorage({
        key: String('content' + that.data.travelid),
        data: res
      })
    })

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