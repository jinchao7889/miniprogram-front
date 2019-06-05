const wxRequest = require('../../../utils/promise-util.js');
const forMatTime = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    tabid: 0,
    tableData: ['全部', '待付款', '进行中', '已完成'],
    ordermes: [],
    ordermesnopay: [],
    ordermesing: [],
    ordermesfinish: [],
    pages: 0,
    nowpages: 0,
    temp: 1,
    pagesa: 0,
    nowpagesa: 0,
    tempa: 1

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadmoreallmes(0);
    this.loadmorefinishmes(0);
    this.loadmoremesing(0);
    this.loadmorenopaymes(0);
  },


  loadmoreallmes(i) {
    var that = this
    var data = {
      "orderStatus": 0,
      "page": i,
      "size": 10
    }
    wxRequest.postRequest(app.globalData.get_orderform_all, data).then(res => {
      console.log('全部订单：', res)
      for (var i = 0; i < res.dataList.length; i++) {
        res.dataList[i]["createTime"] = forMatTime.tsFormatTime(res.dataList[i]["createTime"], 'Y-M-D h:m:s')
        res.dataList[i]["startTime"] = forMatTime.tsFormatTime(res.dataList[i]["startTime"], 'Y.M.D')
        res.dataList[i]["endTime"] = forMatTime.tsFormatTime(res.dataList[i]["endTime"], 'Y.M.D')
      }
      var list = that.data.ordermes
      that.setData({
        ordermes: res.dataList
      })
      that.data.pages = res.pages
      that.data.nowpages = res.nowPage
    })
  },

  loadmorenopaymes(i){
    var that = this
    var data = {
      "orderStatus": 10,
      "page": i,
      "size": 10
    }
    wxRequest.postRequest(app.globalData.get_orderform_all, data).then(res => {
      console.log('未付款订单：', res)
      for (var i = 0; i < res.dataList.length; i++) {
        res.dataList[i]["createTime"] = forMatTime.tsFormatTime(res.dataList[i]["createTime"], 'Y-M-D h:m:s')
        res.dataList[i]["startTime"] = forMatTime.tsFormatTime(res.dataList[i]["startTime"], 'Y.M.D')
        res.dataList[i]["endTime"] = forMatTime.tsFormatTime(res.dataList[i]["endTime"], 'Y.M.D')
      }
      that.setData({
        ordermesnopay: res.dataList
      })
    })
  },

  loadmoremesing(i) {
    var that = this
    var data = {
      "orderStatus": 20,
      "page": i,
      "size": 10
    }
    wxRequest.postRequest(app.globalData.get_orderform_all, data).then(res => {
      console.log('进行中订单：', res)
      for (var i = 0; i < res.dataList.length; i++) {
        res.dataList[i]["createTime"] = forMatTime.tsFormatTime(res.dataList[i]["createTime"], 'Y-M-D h:m:s')
        res.dataList[i]["startTime"] = forMatTime.tsFormatTime(res.dataList[i]["startTime"], 'Y.M.D')
        res.dataList[i]["endTime"] = forMatTime.tsFormatTime(res.dataList[i]["endTime"], 'Y.M.D')
      }
      that.setData({
        ordermesing: res.dataList
      })
    })
  },

  loadmorefinishmes(i) {
    var that = this
    var data = {
      "orderStatus": 40,
      "page": i,
      "size": 10
    }
    wxRequest.postRequest(app.globalData.get_orderform_all, data).then(res => {
      console.log('已完成订单：', res)
      for (var i = 0; i < res.dataList.length; i++) {
        res.dataList[i]["createTime"] = forMatTime.tsFormatTime(res.dataList[i]["createTime"], 'Y-M-D h:m:s')
        res.dataList[i]["startTime"] = forMatTime.tsFormatTime(res.dataList[i]["startTime"], 'Y.M.D')
        res.dataList[i]["endTime"] = forMatTime.tsFormatTime(res.dataList[i]["endTime"], 'Y.M.D')
      }
      var list = that.data.ordermesfinish
      that.setData({
        ordermesfinish: res.dataList
      })
      that.data.pagesa = res.pages
      that.data.nowpagesa = res.nowPage
    })
  },




  goorderdetail(e) {
    var index = e.currentTarget.dataset.index
    var orderid = this.data.ordermes[e.currentTarget.dataset.index].orderId
    wx.navigateTo({
      url: `/pages/mine/ordermesdetail/detail?oid=${orderid}`
    })
  },

  godonkeyorderdetail(e) {
    var index = e.currentTarget.dataset.index
    var orderid = this.data.ordermes[e.currentTarget.dataset.index].orderId
    wx.navigateTo({
      url: `/pages/mine/ordermesdonkeydetail/detail?oid=${orderid}`
    })
  },

  tabSelect(e) {
    var id = e.target.dataset.id
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
      tabid: id
    })

  },






  onReady: function() {

  },


  onShow: function() {

  },


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
    if (this.data.TabCur == 0) {
      if (this.data.nowpages < this.data.pages) {
        this.loadmoreallmes(this.data.temp);
        this.data.temp = this.data.temp + 1;
      } else {
        wx.showToast({
          title: '没有更多了！',
          icon: 'none'
        })
        this.data.temp = 1;
      }
    } else if(this.data.TabCur==3) {
      if (this.data.nowpagesa < this.data.pagesa) {
        this.loadmorefinishmes(this.data.tempa);
        this.data.tempa = this.data.tempa + 1;
      } else {
        wx.showToast({
          title: '没有更多了！',
          icon: 'none'
        })
        this.data.tempa = 1;
      }
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})