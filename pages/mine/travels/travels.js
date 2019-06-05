// pages/mine/travels/travels.js
const wxRequest = require('../../../utils/promise-util.js');
const forMatTime = require('../../../utils/util.js');
var app = getApp();

Page({

  data: {
    mes: [],
    CustomBar: app.globalData.CustomBar,
    covermap: String,
    title: String,
    browseVolume: Number,
    fabulousVolume: Number,
    isshow: false,
    index: 0,
    pages: 0,
    nowpages: 0,
    temp: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  getmytravels(i){
    var data = {
      "page": i,
      "size": 10,
      "status": 2
    }
    var that = this
    wxRequest.postRequest(app.globalData.get_owner_travels, data).then(res => {
      console.log(res)
      for (var i = 0; i < res.dataList.length; i++) {
        res.dataList[i]["releaseTime"] = forMatTime.tsFormatTime(res.dataList[i]["releaseTime"], 'Y/M/D')
      }
      var list=that.data.mes
      that.setData({
        mes: list.concat(res.dataList) 
      })
      that.data.pages = res.pages
      that.data.nowpages = res.nowPage
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  gowritenewcontent(e) {
    wx.navigateTo({
      url: `/pages/travels/writetravels/writetravels?tid=a`,
    })
  },

  goedittravel(e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      isshow: true,
      index: index
    })
    console.log('长按我的游记，编号是：', index)
  },


  gotraveldetail(e) {
    var index = e.currentTarget.dataset.index
    var tid = this.data.mes[this.data.index].travelsId
    wx.navigateTo({
      url: `/pages/travels/details/details?tid=${tid}`,
    })
  },


  cancel() {
    this.setData({
      isshow: false
    })
  },

  godelet(e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除这篇游记吗',
      success(res) {
        if (res.confirm) {
          wxRequest.getRequest(app.globalData.delet_travel + that.data.mes[that.data.index].travelsId, null).then(res => {
            console.log('删除游记情况：', res)
            that.getmytravels(0)
            that.setData({
              isshow: false
            })
          })

        } else if (res.cancel) {
          that.setData({
            isshow: false
          })
        }
      }
    })

  },


  goedit(e) {
    var tid=this.data.mes[this.data.index].travelsId
    console.log('编辑游记',tid)
    wx.navigateTo({
      url: `/pages/travels/writetravels/writetravels?tid=${tid}`,
    })
    this.setData({
      isshow:false
    })

  },






  onShow: function() {

    this.getmytravels(0)
 
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
    if (this.data.nowpages < this.data.pages) {
      this.getmytravels(this.data.temp);
      this.data.temp = this.data.temp + 1;
    } else {
      wx.showToast({
        title: '没有更多了！',
        icon:'none'
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