// pages/main/donkey/donkey.js
const wxRequest = require('../../../utils/promise-util.js');
const forMatTime = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    tableData: ['全部旅行', '我的旅行'],
    mes: [],
    mymes:[],
    pages: 0,
    nowpages: 0,
    temp: 1,
    pagesa: 0,
    nowpagesa: 0,
    tempa: 1,
    isLoad: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadmoremes(0);
    this.loadmoremymes(0);
  },

loadmoremymes(a){
  var that=this
  var data = {
    "page": a,
    "size": 5
  }
  wxRequest.postRequest(app.globalData.get_activity_owner, data).then(res => {
    console.log('我的旅行', res)
    for (var i = 0; i < res.dataList.length; i++) {
      res.dataList[i]["startActivity"] = forMatTime.tsFormatTime(res.dataList[i]["startActivity"], 'Y.M.D')
      res.dataList[i]["createTime"] = forMatTime.tsFormatTime(res.dataList[i]["createTime"], 'Y-M-D h:m:s')
    }
    var list=that.data.mymes
    that.setData({
      mymes: list.concat(res.dataList)
    })
    that.data.pagesa = res.pages
    that.data.nowpagesa = res.nowPage
  })

},




  loadmoremes(a) {
    var that = this
    var data = {
      "page": a,
      "size": 5,
      "activityStatus": 1
    }

    wxRequest.postRequest(app.globalData.get_activity_all, data).then(res => {
      for (var i = 0; i < res.dataList.length; i++) {
        res.dataList[i]["startActivity"] = forMatTime.tsFormatTime(res.dataList[i]["startActivity"], 'Y.M.D')
      }

      var list = that.data.mes
      that.setData({
        mes: list.concat(res.dataList)
      })

      that.data.pages = res.pages
      that.data.nowpages = res.nowPage
    })
  },



  gotodonkeydetail(e) {
    var index = e.currentTarget.dataset.index
    var did=this.data.mes[index].id
    console.log(did)
    wx.navigateTo({
      url: `/pages/donkey-detail/detail?did=${did}`,
    })
  },


  gotoactivitysignupdetail(e){
    var index = e.currentTarget.dataset.index
    var id = this.data.mymes[index].id
    wx.navigateTo({
      url: `/pages/activitysignuodetail/detail?aid=${id}`,
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
    if(this.data.TabCur==0){
      if (this.data.nowpages < this.data.pages) {
        this.loadmoremes(this.data.temp);
        this.data.temp = this.data.temp + 1;
      } else {
        this.setData({
          isLoad: true
        })
        this.data.temp = 1;
      }
    }else{
      if (this.data.nowpagesa < this.data.pagesa) {
        this.loadmoremymes(this.data.tempa);
        this.data.tempa = this.data.tempa + 1;
      } else {
        wx.showToast({
          title: '没有更多了!',
          icon:'none'
        })
        this.data.tempa = 1;
      }
    }
   
  },

  /**
   * 用户点击右上角分享
   */

  onShareAppMessage: function() {

  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  }
})